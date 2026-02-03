'use client';

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadMagnetForm } from './LeadMagnetForm';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface StickyFooterCTAProps {
  degreeName?: string;
  degreeId?: string;
}

export function StickyFooterCTA({ degreeName, degreeId }: StickyFooterCTAProps) {
  const [showForm, setShowForm] = useState(false);

  const whatsappLink = generateWhatsAppLink(degreeName || 'online degrees');
  const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+918048048077';

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-2 lg:hidden z-50">
        <Button
          onClick={() => setShowForm(true)}
          className="flex-1 py-3"
        >
          Get Free Counselling
        </Button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href={`tel:${phoneNumber}`}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      <LeadMagnetForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        degreeName={degreeName}
        degreeId={degreeId}
        source="sticky_footer"
      />
    </>
  );
}
