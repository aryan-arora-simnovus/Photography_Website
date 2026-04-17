// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const StudioMap = () => {
  return (
    <div className="mt-10 rounded-2xl overflow-hidden shadow-xl border border-nature-moss">
      <div className="relative w-full h-[400px]">
        <iframe
          title="Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0277306329626!2d72.79541621102771!3d21.151294683477076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d99e327ea9b%3A0x531833729246f7ba!2sSnippets%20by%20Tanvi!5e0!3m2!1sen!2sin!4v1751817733333!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
};

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  inquiry_type: z.string().min(1, 'Please select a session type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferred_date: z.string().optional(),
  budget_range: z.string().optional(),
  location_preference: z.string().optional(),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const inquiryTypes = [
    { value: 'maternity', label: 'Baby Blossom (Maternity)' },
    { value: 'newborn', label: 'Newborn Photography' },
    { value: '3 months', label: '3 Months Baby Shoot' },
    { value: '6 months', label: '6 Months Baby Shoot' },
    { value: '1 year', label: '1 Year Baby Shoot' },
    { value: 'prewedding', label: 'Pre-Wedding Shoot' },
    { value: 'wedding', label: 'Wedding Photography' },
    { value: 'family', label: 'Family Portrait' },
    { value: 'commercial', label: 'Commercial Shoot' },
    { value: 'other', label: 'Other' },
  ];

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-nature-cream flex items-center justify-center py-20 px-4">
        <Card className="max-w-xl w-full text-center shadow-2xl border-none rounded-3xl overflow-hidden">
          <CardContent className="p-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-nature-forest mb-4">Successfully Sent</h1>
            <p className="text-gray-600 mb-10 leading-relaxed">
              We've received your inquiry! Tanvi personally reviews every message and will get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-nature-moss hover:bg-nature-forest px-8 py-6 rounded-full"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-cream/30 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-nature-forest mb-8">
            Let's Story-Tell Together
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Every family has a unique rhythm. Whether you're expecting, celebrating a milestone, or just want to capture today's joy, we're here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="space-y-8">
            <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-nature-forest text-white p-8">
                <CardTitle className="text-2xl font-serif">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-nature-cream rounded-xl text-nature-moss group-hover:bg-nature-moss group-hover:text-white transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-nature-forest uppercase tracking-wider mb-1">Email</p>
                    <p className="text-gray-600 text-sm md:text-base">snippetsbytanvi@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-nature-cream rounded-xl text-nature-moss group-hover:bg-nature-moss group-hover:text-white transition-colors">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-nature-forest uppercase tracking-wider mb-1">Location</p>
                    <p className="text-gray-600">Surat, Gujarat</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-nature-moss text-white rounded-3xl overflow-hidden p-8">
              <h3 className="text-2xl font-serif mb-4 italic">“Photography is the beauty of life captured.”</h3>
              <p className="text-nature-sage/80">— Let's preserve yours.</p>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardContent className="p-10 md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-nature-forest">Full Name *</Label>
                      <Input {...register('name')} className="h-12 bg-nature-cream/20 border-nature-sage/20 rounded-xl" placeholder="Full Name" />
                      {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-nature-forest">Email Address *</Label>
                      <Input {...register('email')} type="email" className="h-12 bg-nature-cream/20 border-nature-sage/20 rounded-xl" placeholder="email@address.com" />
                      {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-nature-forest">Session Type *</Label>
                      <Select onValueChange={(val) => setValue('inquiry_type', val)}>
                        <SelectTrigger className="h-12 bg-nature-cream/20 border-nature-sage/20 rounded-xl font-normal">
                          <SelectValue placeholder="Select session" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.inquiry_type && <p className="text-xs text-red-500 font-medium">{errors.inquiry_type.message}</p>}
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-nature-forest">Vision *</Label>
                      <Input {...register('preferred_date')} type="date" className="h-12 bg-nature-cream/20 border-nature-sage/20 rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-nature-forest">Share your story *</Label>
                    <Textarea {...register('message')} className="bg-nature-cream/20 border-nature-sage/20 rounded-xl min-h-[150px]" placeholder="Tell me about your family..." />
                    {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-nature-moss hover:bg-nature-forest py-8 text-lg font-bold rounded-2xl transition-all duration-300">
                    {isSubmitting ? "Sending Your Story..." : "Send Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <StudioMap />
      </div>
    </div>
  );
};

export default Contact;