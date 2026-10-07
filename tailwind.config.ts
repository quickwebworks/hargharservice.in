import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Tailwind v4 uses the CSS-first `@theme` block in src/app/globals.css
 * as the single source of truth for design tokens. This config is kept
 * minimal and references the same CSS variables so both paths agree.
 */
const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'var(--background)',
                        foreground: 'var(--foreground)',
                        card: {
                                DEFAULT: 'var(--card)',
                                foreground: 'var(--card-foreground)'
                        },
                        popover: {
                                DEFAULT: 'var(--popover)',
                                foreground: 'var(--popover-foreground)'
                        },
                        primary: {
                                DEFAULT: 'var(--primary)',
                                foreground: 'var(--primary-foreground)'
                        },
                        secondary: {
                                DEFAULT: 'var(--secondary)',
                                foreground: 'var(--secondary-foreground)'
                        },
                        cta: {
                                DEFAULT: 'var(--cta)',
                                foreground: 'var(--cta-foreground)',
                                hover: 'var(--cta-hover)'
                        },
                        muted: {
                                DEFAULT: 'var(--muted)',
                                foreground: 'var(--muted-foreground)'
                        },
                        accent: {
                                DEFAULT: 'var(--accent)',
                                foreground: 'var(--accent-foreground)'
                        },
                        destructive: {
                                DEFAULT: 'var(--destructive)',
                                foreground: 'var(--destructive-foreground)'
                        },
                        border: 'var(--border)',
                        input: 'var(--input)',
                        ring: 'var(--ring)',
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
