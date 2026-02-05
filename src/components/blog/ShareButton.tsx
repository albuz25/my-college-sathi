'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title,
        text,
        url: window.location.href,
      }).catch(() => {
        // Silently fail if user cancels
      });
    } else if (typeof window !== 'undefined') {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="ml-auto"
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
}
