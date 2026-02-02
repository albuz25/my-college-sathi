const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '918048048077';

export function generateWhatsAppLink(degreeName: string): string {
  const message = encodeURIComponent(
    `Hi, I'm interested in ${degreeName}. Please help me with admission details and counselling.`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

export function generateWhatsAppLinkWithCustomMessage(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}
