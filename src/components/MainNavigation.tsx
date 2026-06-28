'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, LogOut, User, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';

export function MainNavigation({ onServicesClick, onDashboardClick }: { onServicesClick: () => void; onDashboardClick: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      await fetch('/api/auth/logout', { method: 'POST' });
      toast({ title: 'Logged Out', description: 'You have been successfully logged out' });
      setMobileMenuOpen(false);
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({ title: 'Logout Failed', description: error.message, variant: 'destructive' });
    }
  };

  const isLoggedIn = status === 'authenticated' && !!session?.user;
  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN';
  const closeMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { label: 'Services', action: () => { onServicesClick(); closeMenu(); } },
    { label: 'How It Works', action: () => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); } },
    { label: 'About Us', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); } },
    { label: 'Contact', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); } },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg border-b border-border/50 safe-top">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 md:h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight">Har Ghar</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button key={item.label} onClick={item.action} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-colors">
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin">Admin</Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={onDashboardClick}>Dashboard</Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="h-4 w-4 mr-1.5" />Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild><Link href="/login">Login</Link></Button>
                  <Button size="sm" asChild className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-medium rounded-xl shadow-sm shadow-gold-500/20">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <button className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-5 h-14 border-b">
              <span className="font-semibold">Menu</span>
              <button onClick={closeMenu} className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isLoggedIn && (
              <div className="px-5 py-4 border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{session?.user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{session?.user?.email || ''}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {navItems.map((item) => (
                <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl hover:bg-muted/70 transition-colors text-left">
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </nav>

            <div className="border-t px-5 py-4 space-y-2 safe-bottom">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" className="w-full h-12" asChild>
                      <Link href="/admin" onClick={closeMenu}>Admin Panel</Link>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full h-12" onClick={() => { onDashboardClick(); closeMenu(); }}>
                    My Dashboard
                  </Button>
                  <Button variant="outline" className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full h-12" asChild>
                    <Link href="/login" onClick={closeMenu}>Login</Link>
                  </Button>
                  <Button className="w-full h-12 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-lg shadow-gold-500/25" asChild>
                    <Link href="/register" onClick={closeMenu}>Create Account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}