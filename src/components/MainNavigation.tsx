'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export function MainNavigation({ onServicesClick, onDashboardClick }: { onServicesClick: () => void; onDashboardClick: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check localStorage for auth
  const [localAuth, setLocalAuth] = useState<{ token: string; user: any } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');
    if (token && userInfo) {
      const parsedUser = JSON.parse(userInfo);
      // Use setTimeout to avoid synchronous state update in effect
      setTimeout(() => {
        setLocalAuth({ token, user: parsedUser });
      }, 0);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      setLocalAuth(null);

      // Sign out from NextAuth
      await signOut({ redirect: false });

      // Call logout API
      await fetch('/api/auth/logout', { method: 'POST' });

      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });

      setMobileMenuOpen(false);
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Failed',
        description: error.message || 'An error occurred during logout',
        variant: 'destructive',
      });
    }
  };

  const isLoggedIn = status === 'authenticated' || !!localAuth;
  const isAdmin = session?.user?.role === 'ADMIN' || localAuth?.user?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Har Ghar Services</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onServicesClick}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Button variant="outline" asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </Button>
                )}
                <Button variant="ghost" onClick={onDashboardClick}>
                  My Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-cta hover:bg-cta/foreground text-cta-foreground">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <button
            onClick={() => { onServicesClick(); setMobileMenuOpen(false); }}
            className="block py-2 text-sm font-medium w-full text-left"
          >
            Services
          </button>
          <button
            onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
            className="block py-2 text-sm font-medium w-full text-left"
          >
            How It Works
          </button>
          <button
            onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
            className="block py-2 text-sm font-medium w-full text-left"
          >
            About Us
          </button>
          <button
            onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
            className="block py-2 text-sm font-medium w-full text-left"
          >
            Contact
          </button>

          <div className="pt-3 border-t space-y-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-2 py-2 bg-muted rounded-lg">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {session?.user?.name || localAuth?.user?.name || 'User'}
                  </span>
                </div>
                {isAdmin && (
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  </Button>
                )}
                <Button variant="outline" onClick={() => { onDashboardClick(); setMobileMenuOpen(false); }} className="w-full">
                  My Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { handleLogout(); }}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full bg-cta hover:bg-cta/foreground text-cta-foreground">
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}