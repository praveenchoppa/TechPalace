import { BUSINESS, mailtoLink, telLink, whatsappLink } from '../config/contact'

type ContactActionsProps = {
  layout?: 'row' | 'stack'
}

export function ContactActions({ layout = 'row' }: ContactActionsProps) {
  const primaryPhone = BUSINESS.phones[0]
  const wa = whatsappLink('Hello Tech Palace Systems, I need help with my repair.')

  return (
    <div className={`contact-actions contact-actions--${layout}`}>
      <a href={telLink(primaryPhone)} className="btn btn--primary">
        Call {primaryPhone}
      </a>
      <a href={mailtoLink()} className="btn btn--secondary">
        Email us
      </a>
      {wa ? (
        <a href={wa} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      ) : (
        <span className="btn btn--whatsapp btn--disabled" title="Set WHATSAPP_NUMBER in src/config/contact.ts">
          WhatsApp (configure number)
        </span>
      )}
    </div>
  )
}
