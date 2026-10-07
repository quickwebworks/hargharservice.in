'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, LogOut, User, X, ChevronRight, Home, LayoutGrid, Phone } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';

export function MainNavigation({ onServicesClick, onDashboardClick }: { onServicesClick: () => void; onDashboardClick: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      {/* ── Glass sticky header ── */}
      <header
        className={`sticky top-0 z-50 w-full safe-top transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(10,20,36,0.12)]'
            : 'bg-background/40 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-13 md:h-14' : 'h-14 md:h-16'}`}>
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 group-hover:rotate-3 transition-transform">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/25" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight font-display">
                Har<span className="text-brand-500">Ghar</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/50 bg-card/60 backdrop-blur-sm px-1.5 py-1">
              {navItems.map((item) => (
                <button key={item.label} onClick={item.action} className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors">
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild className="rounded-xl">
                      <Link href="/admin">Admin</Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={onDashboardClick} className="rounded-xl">Dashboard</Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl">
                    <LogOut className="h-4 w-4 mr-1.5" />Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="rounded-xl"><Link href="/login">Login</Link></Button>
                  <Button size="sm" asChild className="btn-brand font-medium rounded-xl shadow-sm shadow-brand-500/25">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile bottom tab bar — app-like, thumb friendly ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border/60 safe-bottom" aria-label="Quick actions">
        <div className="grid grid-cols-4 px-2 py-1.5">
          <Link href="/" className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-brand-600">
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Home</span>
          </Link>
          <button onClick={onServicesClick} className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors">
            <LayoutGrid className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Services</span>
          </button>
          <a href="tel:+919780554129" className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Call</span>
          </a>
          <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors">
            <Menu className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Menu</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-over menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={closeMenu} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-5 h-14 border-b">
              <span className="font-semibold font-display">Menu</span>
              <button onClick={closeMenu} className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-muted transition-colors" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isLoggedIn && (
              <div className="px-5 py-4 border-b bg-accent/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-md shadow-brand-500/25">
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
                <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl hover:bg-accent/60 transition-colors text-left">
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </nav>

            <div className="border-t px-5 py-4 space-y-2 safe-bottom">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" className="w-full h-12 rounded-xl" asChild>
                      <Link href="/admin" onClick={closeMenu}>Admin Panel</Link>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => { onDashboardClick(); closeMenu(); }}>
                    My Dashboard
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full h-12 rounded-xl" asChild>
                    <Link href="/login" onClick={closeMenu}>Login</Link>
                  </Button>
                  <Button className="w-full h-12 btn-brand font-semibold rounded-xl shadow-lg shadow-brand-500/25" asChild>
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
