'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Extra delay in ms before the element animates in */
  delay?: number;
  className?: string;
  /** Render as a different element, defaults to div */
  as?: 'div' | 'section' | 'li' | 'span';
};

/**
 * Scroll-triggered reveal animation.
 * Uses IntersectionObserver, plays once, and is automatically
 * disabled for users with prefers-reduced-motion (handled in CSS).
 */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
