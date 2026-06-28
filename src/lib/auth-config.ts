import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email or Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email/phone and password are required');
        }

        const identifier = credentials.email.trim();
        const password = credentials.password;

        // Try to find user by email first, then by phone
        let user = await db.user.findUnique({ where: { email: identifier } });
        if (!user) {
          user = await db.user.findUnique({ where: { phone: identifier } });
        }

        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Check if user is active
        if (user.status === 'SUSPENDED') {
          throw new Error('Your account has been suspended. Please contact support.');
        }

        if (user.status === 'PENDING') {
          // Auto-activate pending users (no real OTP service)
          user = await db.user.update({
            where: { id: user.id },
            data: { status: 'ACTIVE', otp: null, otpExpiry: null },
          });
        }

        if (user.status !== 'ACTIVE' && user.status !== 'INACTIVE') {
          throw new Error('Account is not active. Please contact support.');
        }

        // For OAuth users without password
        if (!user.password && user.provider === 'GOOGLE') {
          throw new Error('Please sign in with Google');
        }

        // Verify password
        if (user.password) {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      // CredentialsProvider already validates in authorize()
      if (account?.provider === 'google' && user.email) {
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            await db.user.create({
              data: {
                email: user.email,
                name: user.name || 'Google User',
                phone: '0000000000',
                password: '',
                provider: 'GOOGLE',
                googleId: account.providerAccountId,
                avatar: user.image,
                role: 'CUSTOMER',
                status: 'ACTIVE',
              },
            });
          } else if (existingUser.provider === 'EMAIL') {
            await db.user.update({
              where: { id: existingUser.id },
              data: {
                googleId: account.providerAccountId,
                avatar: user.image || existingUser.avatar,
              },
            });
          } else if (existingUser.status === 'PENDING') {
            await db.user.update({
              where: { id: existingUser.id },
              data: { status: 'ACTIVE', otp: null, otpExpiry: null },
            });
          }
        } catch (error) {
          console.error('Error during Google sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // On first sign-in, enrich token from DB
        const dbUser = await db.user.findUnique({
          where: { email: user.email! },
        });
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role || dbUser?.role || 'CUSTOMER';
        token.provider = account?.provider || 'EMAIL';
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'har-ghar-services-secret-key',
};