'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  useEffect(() => {
    if (status === 'authenticated' && session) {
      if (session.user?.role === 'ADMIN' || session.user?.role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);

  const handleLogin = async (e: React.FormEvent, identifier: string) => {
    e.preventDefault();
    if (!identifier || !loginPassword) return;

    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: identifier,
        password: loginPassword,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: 'Login Failed',
          description: result.error === 'CredentialsSignin'
            ? 'Invalid email/phone or password'
            : result.error,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Login Successful', description: 'Welcome back! Redirecting...' });
        // Small delay to let session update
        setTimeout(() => {
          const sessionCheck = document.cookie.includes('next-auth.session-token') ||
            document.cookie.includes('authjs.session-token');
          if (sessionCheck) {
            // Will redirect via useEffect when session updates
          }
        }, 300);
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error: any) {
      toast({
        title: 'Google Sign-In Failed',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-50 via-background to-sky-light">
      <div className="sticky top-0 z-50 glass border-b safe-top">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button variant="ghost" size="icon" asChild className="-ml-2">
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-lg font-semibold">Sign In</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pb-8 md:p-8">
        <Card className="w-full max-w-md shadow-xl shadow-brand-500/5 border-0 md:border">
          <CardHeader className="space-y-1 text-center pt-8 pb-4 px-6 md:px-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-sm">Sign in to your Har Ghar account</CardDescription>
          </CardHeader>
          <CardContent className="px-6 md:px-8 pb-4">
            <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'email' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setLoginMethod('email')}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" /> Email
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setLoginMethod('phone')}
                disabled={isLoading}
              >
                <Phone className="h-4 w-4" /> Phone
              </button>
            </div>

            {loginMethod === 'email' ? (
              <form onSubmit={(e) => handleLogin(e, loginEmail)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <button type="button" className="text-xs text-brand-600 hover:text-brand-700 font-medium">Forgot password?</button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 btn-brand font-semibold text-base rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
                  disabled={isLoading}
                >
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : 'Sign In'}
                </Button>
              </form>
            ) : (
              <form onSubmit={(e) => handleLogin(e, loginPhone)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-phone">Phone Number</Label>
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password-phone">Password</Label>
                  <Input
                    id="login-password-phone"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 btn-brand font-semibold text-base rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
                  disabled={isLoading}
                >
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : 'Sign In'}
                </Button>
              </form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 pb-8 px-6 md:px-8">
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-cta hover:text-cta-hover font-semibold">Create Account</Link>
            </p>
            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link href="#" className="underline hover:text-foreground">Terms</Link>{' '}
              and{' '}
              <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}