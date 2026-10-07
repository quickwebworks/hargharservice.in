import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0fb5a8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1424" },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Har Ghar Cleaning Services | Professional Home & Office Cleaning in Ludhiana",
  description: "Har Ghar Cleaning Services offers professional residential & commercial cleaning in Ludhiana, Punjab. Deep cleaning, sofa & kitchen care, bathroom cleaning, car wash & more. Expert cleaners, 24/7 support. Call 97805 54129 to book now!",
  keywords: ["cleaning services Ludhiana", "home cleaning", "office cleaning", "deep cleaning", "sofa cleaning", "kitchen cleaning", "bathroom cleaning", "car wash", "Har Ghar Service", "professional cleaners Punjab"],
  authors: [{ name: "Har Ghar Cleaning Services" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/logo.png",
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Har Ghar Service",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: "Har Ghar Cleaning Services | Professional Home & Office Cleaning",
    description: "From deep cleaning to sofa and kitchen care, Har Ghar Cleaning Services ensures a spotless home with professional-grade services. Book now and enjoy a pristine living space!",
    url: "https://hargharservice.in",
    siteName: "Har Ghar Cleaning Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Har Ghar Cleaning Services | Professional Home & Office Cleaning",
    description: "Professional residential & commercial cleaning in Ludhiana. Deep cleaning, sofa & kitchen care, and more. Call 97805 54129 to book!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  );
}
