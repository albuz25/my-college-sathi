'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
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
      
      // If brochure variant, trigger download
      if (variant === 'brochure' && data.brochureUrl) {
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
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {variant === 'brochure' 
              ? 'Download Free Brochure' 
              : 'Get Free Counselling'
            }
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              {variant === 'brochure'
                ? 'Your brochure download will start shortly.'
                : 'Our counsellor will contact you within 24 hours.'
              }
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Current Qualification *</Label>
              <Select
                value={formData.qualification}
                onValueChange={(value) => setFormData({ ...formData, qualification: value })}
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

            {!degreeName && (
              <div className="space-y-2">
                <Label htmlFor="degree">Interested Degree *</Label>
                <Select
                  value={formData.interestedDegree}
                  onValueChange={(value) => setFormData({ ...formData, interestedDegree: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
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
            )}

            {degreeName && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Interested in:</p>
                <p className="font-semibold">{degreeName}</p>
              </div>
            )}

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
              By submitting, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
