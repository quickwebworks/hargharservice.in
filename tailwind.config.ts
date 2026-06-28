import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        cta: {
                                DEFAULT: 'var(--cta)',
                                foreground: 'var(--cta-foreground)',
                                hover: 'var(--cta-hover)'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // Charcoal + Gold theme tokens
                        charcoal: {
                                50: '#f7f7f8',
                                100: '#eeefef',
                                200: '#d5d6d8',
                                300: '#b0b2b6',
                                400: '#8a857c',
                                500: '#6b6c70',
                                600: '#56575a',
                                700: '#4a4b50',
                                800: '#35363a',
                                900: '#2a2b2e',
                                950: '#1a1b1d',
                        },
                        gold: {
                                50: '#fdf9f3',
                                100: '#faf3e8',
                                200: '#f5ebe0',
                                300: '#e8ddd0',
                                400: '#dcc9a8',
                                500: '#d4a869',
                                600: '#c49555',
                                700: '#a87a3d',
                                800: '#8a5a2b',
                                900: '#6b4520',
                                950: '#3d2612',
                        },
                        sage: {
                                50: '#f4f9f4',
                                100: '#eef5ef',
                                200: '#d5e7d6',
                                300: '#afd3b2',
                                400: '#85ba89',
                                500: '#6b8f71',
                                600: '#547459',
                                700: '#425c47',
                                800: '#38493c',
                                900: '#2f3d32',
                                950: '#172119',
                        },
                        // Modern accent colors
                        coral: {
                                50: '#fef5f2',
                                100: '#fdf0ec',
                                200: '#fce0d6',
                                300: '#f8c5b1',
                                400: '#f0a58a',
                                500: '#e07a5f',
                                600: '#c4603f',
                                700: '#a34b33',
                                800: '#843d2d',
                                900: '#6b3427',
                        },
                        teal: {
                                accent: 'var(--teal-accent)',
                                light: 'var(--teal-light)',
                                50: '#f0fafa',
                                100: '#ecf5f5',
                                200: '#d0eaeb',
                                300: '#a4d5d7',
                                400: '#72b8bb',
                                500: '#3d8b8b',
                                600: '#327070',
                                700: '#2b5b5b',
                                800: '#264a4a',
                                900: '#223e3e',
                        },
                        lavender: {
                                50: '#f8f7fc',
                                100: '#f0edf7',
                                200: '#ddd6ef',
                                300: '#c2b5e2',
                                400: '#a08fdb',
                                500: '#8b7ec8',
                                600: '#7365b3',
                                700: '#5f5195',
                                800: '#4e447a',
                                900: '#423a67',
                        },
                        plum: {
                                50: '#fbf5f8',
                                100: '#f7edf1',
                                200: '#efd8e2',
                                300: '#e0b6c8',
                                400: '#cc8da6',
                                500: '#a85d75',
                                600: '#904a63',
                                700: '#7a3d54',
                                800: '#673447',
                                900: '#582e3e',
                        },
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