'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
  duration: string;
  gst: number;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <Card className="group cursor-pointer overflow-hidden transition-all border-border/50 h-full flex flex-col card-lift hover:border-border" onClick={() => setShowDetail(true)}>
        <div className="relative h-36 sm:h-40 bg-gradient-to-br from-warm-gray to-cream flex items-center justify-center shrink-0">
          <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500">{service.image}</span>
          {service.badge && (
            <Badge className="absolute top-3 right-3 bg-gold-500 text-white text-[10px] px-2.5 py-0.5 border-0 font-semibold shadow-sm">{service.badge}</Badge>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-sm sm:text-base mb-1.5 group-hover:text-gold-600 transition-colors line-clamp-1">{service.title}</h3>
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-sm font-medium">{service.rating}</span>
            <span className="text-xs text-muted-foreground">({service.reviews.toLocaleString()})</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="text-lg sm:text-xl font-bold">{service.price}</span>
              <span className="text-[11px] text-muted-foreground ml-0.5">onwards</span>
            </div>
            <Button variant="outline" size="sm" className="group-hover:bg-gradient-to-r group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-white group-hover:border-gold-500 group-hover:shadow-sm group-hover:shadow-gold-500/25 transition-all h-9 rounded-xl">
              Book <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 sm:p-6 gap-0">
          <DialogHeader className="p-5 pb-0 sm:px-0 sm:pt-0 sm:pb-0">
            <DialogTitle className="text-xl sm:text-2xl">{service.title}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mx-5 sm:mx-0 mt-3 sm:mt-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="booking">Book Now</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-5 px-5 pb-6 sm:px-0 sm:pb-0">
              <div className="grid sm:grid-cols-2 gap-5 mt-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 sm:p-8 flex items-center justify-center">
                  <span className="text-8xl">{service.image}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-lg">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>Duration: {service.duration}</span>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-3xl font-bold text-primary">{service.price}</div>
                    <p className="text-sm text-muted-foreground">+ {service.gst}% GST applicable</p>
                  </div>
                  <Button size="lg" className="w-full h-12 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40" onClick={() => setShowDetail(true)}>
                    Book This Service
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">About this service</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">What&apos;s included</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-sage" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="space-y-5 px-5 pb-6 sm:px-0 sm:pb-0">
              <div className="grid sm:grid-cols-2 gap-5 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label>Select Date</Label>
                    <div className="mt-2 border rounded-xl p-3 sm:p-4">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md" />
                    </div>
                  </div>
                  <div>
                    <Label>Select Time Slot</Label>
                    <Select>
                      <SelectTrigger className="mt-2 h-12 rounded-xl"><SelectValue placeholder="Choose time slot" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM - 11:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM - 01:00 PM</SelectItem>
                        <SelectItem value="14:00">02:00 PM - 04:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM - 06:00 PM</SelectItem>
                        <SelectItem value="18:00">06:00 PM - 08:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div><Label>Full Name</Label><Input placeholder="Enter your name" className="mt-2 h-12 rounded-xl" /></div>
                  <div><Label>Phone Number</Label><Input placeholder="Enter phone number" className="mt-2 h-12 rounded-xl" /></div>
                  <div><Label>Address</Label><Textarea placeholder="Enter your complete address" className="mt-2 rounded-xl" rows={3} /></div>
                  <div><Label>Additional Notes (Optional)</Label><Textarea placeholder="Any special requirements..." className="mt-2 rounded-xl" rows={2} /></div>
                </div>
              </div>
              <Separator className="mx-0 sm:mx-auto" />
              <div className="space-y-3">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Service Charge</span><span>{service.price}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GST ({service.gst}%)</span><span>₹{Math.round(parseFloat(service.price.replace('₹', '').replace(',', '')) * service.gst / 100)}</span></div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{Math.round(parseFloat(service.price.replace('₹', '').replace(',', '')) * (1 + service.gst / 100))}</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full h-12 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40">
                Proceed to Payment
              </Button>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-5 px-5 pb-6 sm:px-0 sm:pb-0">
              <div className="text-center py-4 border-b mt-4">
                <div className="text-5xl font-bold text-primary mb-2">{service.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on {service.reviews.toLocaleString()} reviews</p>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">U{i}</div>
                        <div>
                          <div className="font-semibold text-sm">User {i}</div>
                          <div className="text-xs text-muted-foreground">2 days ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`h-3.5 w-3.5 ${j < 5 ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Excellent service! Very professional and thorough. Would definitely recommend.</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}