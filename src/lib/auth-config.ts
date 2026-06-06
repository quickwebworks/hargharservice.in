import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
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
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Create new user from Google account
            await db.user.create({
              data: {
                email: user.email,
                name: user.name || 'Google User',
                phone: '0000000000', // Placeholder, will ask later
                password: '', // No password for OAuth users
                provider: 'GOOGLE',
                googleId: account.providerAccountId,
                avatar: user.image,
                role: 'CUSTOMER',
                status: 'ACTIVE',
              },
            });
          } else if (existingUser.provider === 'EMAIL') {
            // Link Google account to existing user
            await db.user.update({
              where: { id: existingUser.id },
              data: {
                googleId: account.providerAccountId,
                avatar: user.image || existingUser.avatar,
              },
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
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user && user.email) {
        const dbUser = await db.user.findUnique({
          where: { email: user.email },
        });
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = dbUser?.role || 'CUSTOMER';
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