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
      <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all" onClick={() => setShowDetail(true)}>
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="text-8xl">{service.image}</span>
          {service.badge && (
            <Badge className="absolute top-4 right-4">{service.badge}</Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-sm text-muted-foreground">({service.reviews.toLocaleString()} reviews)</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">{service.price}</span>
              <span className="text-sm text-muted-foreground ml-1">starting</span>
            </div>
            <Button variant="outline" size="sm" className="group-hover:bg-cta group-hover:text-cta-foreground border-cta/50 hover:border-cta transition-colors">
              Book Now <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{service.title}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="booking">Book Now</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-8 flex items-center justify-center">
                  <span className="text-9xl">{service.image}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
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
                  <Button size="lg" className="w-full bg-cta hover:bg-cta/foreground text-cta-foreground" onClick={() => setShowDetail(true)}>
                    Book This Service
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">About this service</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">What's included</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Select Date</Label>
                    <div className="mt-2 border rounded-lg p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Select Time Slot</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose time slot" />
                      </SelectTrigger>
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
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your name" className="mt-2" />
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <Input placeholder="Enter phone number" className="mt-2" />
                  </div>

                  <div>
                    <Label>Address</Label>
                    <Textarea placeholder="Enter your complete address" className="mt-2" rows={3} />
                  </div>

                  <div>
                    <Label>Additional Notes (Optional)</Label>
                    <Textarea placeholder="Any special requirements..." className="mt-2" rows={2} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Charge</span>
                    <span>{service.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST ({service.gst}%)</span>
                    <span>₹{Math.round(parseFloat(service.price.replace('₹', '').replace(',', '')) * service.gst / 100)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">
                      ₹{Math.round(parseFloat(service.price.replace('₹', '').replace(',', '')) * (1 + service.gst / 100))}
                    </span>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full bg-cta hover:bg-cta/foreground text-cta-foreground">
                Proceed to Payment
              </Button>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="text-center pb-6 border-b">
                <div className="text-5xl font-bold text-primary mb-2">{service.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">Based on {service.reviews.toLocaleString()} reviews</p>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          U{i}
                        </div>
                        <div>
                          <div className="font-semibold">User {i}</div>
                          <div className="text-xs text-muted-foreground">2 days ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excellent service! Very professional and thorough. Would definitely recommend to others.
                    </p>
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
