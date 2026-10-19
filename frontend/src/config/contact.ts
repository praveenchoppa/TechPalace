/** Update when the business confirms the WhatsApp-enabled number. */
export const WHATSAPP_NUMBER = '' // e.g. '919961975595' — country code, no + or spaces

export const BUSINESS = {
  name: 'Tech Palace Systems',
  phones: ['9961975595', '9961765593', '9961625596'] as const,
  email: 'techpalacesystems@gmail.com',
  address:
    'Ground Floor, Edettu Avenue, Near Kurishupalli Junction, Ramapuram Road, Pala – 686575, Kerala, India.',
} as const

export function telLink(phone: string) {
  return `tel:+91${phone}`
}

export function mailtoLink() {
  return `mailto:${BUSINESS.email}`
}

export function whatsappLink(message?: string) {
  if (!WHATSAPP_NUMBER) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`
}
