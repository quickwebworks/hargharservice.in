import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sparkles, Phone, Mail, MapPin, MessageCircle, Globe, Send, Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Har Ghar Cleaning Services - Book Professional Cleaning in Ludhiana',
  description:
    'Get in touch with Har Ghar Cleaning Services for all your cleaning needs. Call 097805 54129, WhatsApp us, or email admin@hargharservice.in. Available 24/7 in Ludhiana, Punjab.',
};

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Mailing Address',
    value: 'Har Ghar Cleaning Services',
    detail: 'Shop No. 3, Plot No. 1341/94, Karnail Singh Nagar, Phase 3, Ludhiana, Punjab, India - 141006',
    color: 'bg-peach-light text-peach ring-1 ring-peach/15',
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Call Now',
    value: '+91 97805 54129',
    href: 'tel:+919780554129',
    color: 'bg-mint-light text-mint ring-1 ring-mint/15',
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    label: 'WhatsApp',
    value: '+91 97805 54129',
    href: 'https://wa.me/919780554129',
    color: 'bg-brand-100 text-brand-600 ring-1 ring-brand-500/15',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    value: 'admin@hargharservice.in',
    href: 'mailto:admin@hargharservice.in',
    color: 'bg-lemon-light text-lemon ring-1 ring-lemon/15',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: 'Website',
    value: 'www.hargharservice.in',
    href: 'https://hargharservice.in',
    color: 'bg-lilac-light text-lilac ring-1 ring-lilac/15',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-sky-light" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-400/20 blur-[90px] animate-glow" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-sky/15 blur-[90px] animate-glow" style={{ animationDelay: '2s' }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 animate-fade-up">
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span className="text-foreground/80">Contact Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight animate-fade-up">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-up animate-fade-up-delay-1">
              Get in touch with us for all your cleaning needs! Contact us via phone, email,
              or our online form, and our team will be happy to assist you.
            </p>
            <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5 animate-fade-up animate-fade-up-delay-2">
              <Clock className="h-4 w-4 text-brand-600" /> Call us! We are available 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact info cards */}
          <div className="space-y-4">
            {contactInfo.map((c) => (
              <Card key={c.label} className="border-border/60 card-lift">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.color}`}>
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="font-semibold hover:text-brand-600 transition-colors break-words"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="font-semibold">{c.value}</p>
                    )}
                    {c.detail && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.detail}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact form */}
          <Card className="border-border/60 shadow-lg h-fit">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-1">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>
              <form
                action="https://formsubmit.co/admin@hargharservice.in"
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="_subject" value="New Contact Form Enquiry - Har Ghar Service" />
                <input type="hidden" name="_captcha" value="true" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" name="name" autoComplete="name" placeholder="Your full name" required className="rounded-xl h-12 text-base" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your phone number" required className="rounded-xl h-12 text-base" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required className="rounded-xl h-12 text-base" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-sm font-medium">Service Needed</label>
                  <Input id="service" name="service" placeholder="e.g. Home Cleaning, Car Wash" className="rounded-xl h-12 text-base" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" name="message" placeholder="Tell us about your cleaning needs..." rows={4} required className="rounded-xl text-base" />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-brand font-semibold rounded-2xl shadow-lg shadow-brand-500/25"
                >
                  <Send className="h-4 w-4 mr-2" /> Submit Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground space-y-1.5">
          <p className="font-medium text-foreground">Har Ghar Cleaning Services</p>
          <p>Shop No. 3, Plot No. 1341/94, Karnail Singh Nagar, Phase 3, Ludhiana, Punjab, India - 141006</p>
          <p>
            <a href="mailto:admin@hargharservice.in" className="hover:text-foreground transition-colors">admin@hargharservice.in</a>
            {' · '}
            <a href="tel:+919780554129" className="hover:text-foreground transition-colors">+91 97805 54129</a>
          </p>
          <p className="pt-2">© {new Date().getFullYear()} Har Ghar Cleaning Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
