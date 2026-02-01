'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  degreeName?: string;
  className?: string;
}

export function WhatsAppButton({ degreeName, className }: WhatsAppButtonProps) {
  const [showPulse, setShowPulse] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user has seen the button before
    const hasSeenWhatsApp = localStorage.getItem('hasSeenWhatsApp');
    if (hasSeenWhatsApp) {
      setShowPulse(false);
    }

    // Stop pulse animation after 10 seconds
    const timer = setTimeout(() => {
      setShowPulse(false);
      localStorage.setItem('hasSeenWhatsApp', 'true');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const whatsappLink = generateWhatsAppLink(degreeName || 'online degrees');

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] right-4 z-40
        p-4 bg-green-500 hover:bg-green-600 text-white rounded-full
        shadow-lg hover:shadow-xl transition-all duration-300
        ${showPulse ? 'animate-pulse' : ''}
        ${className || ''}
      `}
      aria-label="Chat on WhatsApp"
      onClick={() => {
        setShowPulse(false);
        localStorage.setItem('hasSeenWhatsApp', 'true');
      }}
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Ripple effect */}
      {showPulse && (
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
      )}
    </a>
  );
}
