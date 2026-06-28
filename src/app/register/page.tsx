'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are the same',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      setIsSuccess(true);
      toast({ title: 'Account Created!', description: 'Redirecting to sign in...' });

      // Auto sign in after short delay
      setTimeout(async () => {
        const result = await signIn('credentials', {
          email: email,
          password: password,
          redirect: false,
        });
        if (result?.ok) {
          router.push('/');
        } else {
          router.push('/login');
        }
      }, 1500);
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
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

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream via-background to-warm-gray">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b safe-top">
          <div className="flex items-center gap-3 px-4 h-14">
            <Button variant="ghost" size="icon" asChild className="-ml-2">
              <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
            </Button>
            <h1 className="text-lg font-semibold">Account Created</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-sage-light text-sage">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold">Welcome to Har Ghar!</h2>
            <p className="text-muted-foreground max-w-sm">Your account has been created successfully. Signing you in...</p>
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-cta" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream via-background to-warm-gray">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b safe-top">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button variant="ghost" size="icon" asChild className="-ml-2">
            <Link href="/login"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-lg font-semibold">Create Account</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pb-8 md:p-8">
        <Card className="w-full max-w-md shadow-xl border-0 md:border">
          <CardHeader className="space-y-1 text-center pt-8 pb-2 px-6 md:px-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Join Har Ghar</CardTitle>
            <CardDescription className="text-sm">Create your account in seconds</CardDescription>
          </CardHeader>
          <CardContent className="px-6 md:px-8 pb-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} className="h-12" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="........" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm</Label>
                  <Input id="confirm-password" type="password" placeholder="........" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} className="h-12" />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold text-base rounded-xl shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating Account...</> : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full h-12" onClick={handleGoogleSignIn} disabled={isLoading}>
              <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 pb-8 px-6 md:px-8">
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-cta hover:text-cta-hover font-semibold">Sign In</Link>
            </p>
            <p className="text-xs text-center text-muted-foreground">
              By creating an account, you agree to our{' '}
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