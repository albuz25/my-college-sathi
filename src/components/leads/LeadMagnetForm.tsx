'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LeadMagnetFormProps {
  isOpen: boolean;
  onClose: () => void;
  degreeName?: string;
  degreeId?: string;
  source?: string;
  variant?: 'enquiry' | 'brochure';
  onSuccess?: (data: { brochureUrl?: string }) => void;
}

const qualifications = [
  { value: '12th_pass', label: '12th Pass' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Post Graduate' },
  { value: 'working_professional', label: 'Working Professional' },
];

const degrees = [
  { value: 'mba', label: 'MBA' },
  { value: 'bba', label: 'BBA' },
  { value: 'mca', label: 'MCA' },
  { value: 'bca', label: 'BCA' },
  { value: 'mcom', label: 'M.Com' },
  { value: 'bcom', label: 'B.Com' },
  { value: 'other', label: 'Other' },
];

const statesAndUts = [
  { value: 'andaman_nicobar', label: 'Andaman & Nicobar' },
  { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal_pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'dadra_nagar_haveli_daman_diu', label: 'Dadra & Nagar Haveli and Daman & Diu' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal_pradesh', label: 'Himachal Pradesh' },
  { value: 'jammu_kashmir', label: 'Jammu & Kashmir' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'ladakh', label: 'Ladakh' },
  { value: 'lakshadweep', label: 'Lakshadweep' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'puducherry', label: 'Puducherry' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil_nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west_bengal', label: 'West Bengal' },
];

const benefits = [
  'UGC-recognized universities only',
  'Expert counsellor support',
  'Flexible learning + EMI options',
  'Placement assistance guidance',
];

export function LeadMagnetForm({
  isOpen,
  onClose,
  degreeName,
  degreeId,
  source = 'enquiry_form',
  variant = 'enquiry',
  onSuccess,
}: LeadMagnetFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    qualification: '',
    interestedDegree: degreeName?.toLowerCase() || '',
    state: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const composedCity = [formData.city, formData.state]
        .map((s) => s.trim())
        .filter(Boolean)
        .join(', ');

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          currentCity: composedCity || null,
          currentQualification: formData.qualification,
          interestedDegreeName: formData.interestedDegree || degreeName,
          interestedDegreeId: degreeId,
          source: variant === 'brochure' ? 'brochure_download' : source,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setIsSuccess(true);
      
      // Track Meta Pixel conversion event
      trackMetaEvent('Lead', {
        content_name: formData.interestedDegree || degreeName || 'General',
        content_category: variant === 'brochure' ? 'Brochure Download' : 'Enquiry Form',
        value: 1,
        currency: 'INR',
      });
      
      // If brochure variant, trigger download
      if (variant === 'brochure' && data.brochureUrl) {
        trackMetaEvent('Download', {
          content_name: degreeName || 'General Brochure',
        });
        onSuccess?.({ brochureUrl: data.brochureUrl });
      } else {
        onSuccess?.({});
      }

      // Auto close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          qualification: '',
          interestedDegree: '',
          state: '',
          city: '',
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-5">
          {/* Left panel (desktop) */}
          <div className="hidden md:block md:col-span-2 bg-gradient-to-b from-slate-50 to-slate-100 border-r p-6">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/mycollegelogo.png"
                alt="My College Sathi - Online Degree Admissions"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-900">
                Get expert guidance in minutes
              </p>
              <ul className="space-y-2">
                {benefits.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Your info stays private
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  We’ll only use your details to share admission guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-3 p-6">
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {variant === 'brochure' ? 'Download Free Brochure' : 'Get Free Counselling'}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {degreeName ? (
                  <>
                    Interested in <span className="font-medium text-foreground">{degreeName}</span>
                  </>
                ) : (
                  'Share a few details and our counsellor will call you.'
                )}
              </p>
            </DialogHeader>

            {isSuccess ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Thanks! We’ve got it.</h3>
                <p className="text-muted-foreground">
                  {variant === 'brochure'
                    ? 'Your brochure download will start shortly.'
                    : 'Our counsellor will contact you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {error && (
                  <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      No spam. Only admission updates.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      pattern="[0-9]{10}"
                      required
                    />
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Call-back within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Select
                      value={formData.qualification}
                      onValueChange={(value) =>
                        setFormData({ ...formData, qualification: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map((q) => (
                          <SelectItem key={q.value} value={q.value}>
                            {q.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {!degreeName ? (
                    <div className="space-y-2">
                      <Label htmlFor="degree">Interested Course *</Label>
                      <Select
                        value={formData.interestedDegree}
                        onValueChange={(value) =>
                          setFormData({ ...formData, interestedDegree: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {degrees.map((d) => (
                            <SelectItem key={d.value} value={d.value}>
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="rounded-lg border bg-muted/40 px-4 py-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <p className="text-sm">
                        Course: <span className="font-medium">{degreeName}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="state">State (Optional)</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-72">
                        {statesAndUts.map((s) => (
                          <SelectItem key={s.value} value={s.label}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City (Optional)</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : variant === 'brochure' ? (
                    'Download Brochure'
                  ) : (
                    'Submit Enquiry'
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our{' '}
                  <Link href="/terms" className="underline underline-offset-2">
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
