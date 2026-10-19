import { Link } from 'react-router-dom'
import { ContactActions } from '../components/ContactActions'
import { ServiceIcon } from '../components/ServiceIcon'
import { BUSINESS, mailtoLink, telLink } from '../config/contact'
import { DEMO_OFFERS } from '../config/offers'
import { SERVICES } from '../data/services'

export function HomePage() {
  return (
    <>
      <section id="home" className="hero">
        <div className="container hero__grid">
          <div className="hero__content animate-in">
            <p className="eyebrow">Pala, Kerala</p>
            <h1 className="hero__title">Technology, handled.</h1>
            <p className="hero__lead">
              Computer repair, sales and IT support you can rely on — from chip-level service to
              networks, recovery and security systems.
            </p>
            <div className="hero__actions">
              <a href="#services" className="btn btn--primary">
                Explore Our Services
              </a>
              <Link to="/track" className="btn btn--ghost">
                Track Your Repair
              </Link>
            </div>
          </div>
          <div className="hero__visual animate-in animate-in--delay" aria-hidden>
            <div className="hero-card">
              <div className="hero-card__glow" />
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                alt=""
                loading="lazy"
                width={640}
                height={480}
              />
              <div className="hero-card__badge">
                <span className="hero-card__dot" />
                Repair tracking demo available
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section section--muted">
        <div className="container">
          <div className="section-head animate-in">
            <h2>Services</h2>
            <p>End-to-end technology support for homes, offices and institutions.</p>
          </div>
          <ul className="service-grid">
            {SERVICES.map((service, i) => (
              <li
                key={service.id}
                className="service-card animate-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ServiceIcon icon={service.icon} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="offers" className="section">
        <div className="container">
          <div className="section-head animate-in">
            <h2>Offers &amp; promotions</h2>
            <p className="sample-note">
              Sample promotional cards for demonstration. Edit offers in{' '}
              <code>src/config/offers.ts</code> before publishing real campaigns.
            </p>
          </div>
          <ul className="offer-grid">
            {DEMO_OFFERS.map((offer) => (
              <li key={offer.id} className="offer-card">
                <span className="offer-card__badge">{offer.badge}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                {offer.disclaimer && (
                  <p className="offer-card__disclaimer">{offer.disclaimer}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tracking-preview">
        <div className="container tracking-preview">
          <div className="animate-in">
            <h2>Track your repair online</h2>
            <p>
              Enter your repair ID (for example <strong>TP-1001</strong>) to see device status,
              latest updates and costs when available — no login required for this demo.
            </p>
            <Link to="/track" className="btn btn--primary">
              Track Your Repair
            </Link>
          </div>
          <div className="tracking-preview__mock card animate-in animate-in--delay">
            <p className="tracking-preview__label">Sample status</p>
            <p className="tracking-preview__id">TP-1001 · Laptop</p>
            <p className="tracking-preview__status">Repairing</p>
            <div className="tracking-preview__bar">
              <span style={{ width: '65%' }} />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section--muted">
        <div className="container contact-section">
          <div className="section-head animate-in">
            <h2>Contact</h2>
            <p>Visit us on Ramapuram Road or reach out by phone or email.</p>
          </div>
          <div className="contact-section__grid">
            <div className="card contact-card animate-in">
              <h3>Phone</h3>
              <ul className="contact-list">
                {BUSINESS.phones.map((phone) => (
                  <li key={phone}>
                    <a href={telLink(phone)}>{phone}</a>
                  </li>
                ))}
              </ul>
              <h3>Email</h3>
              <p>
                <a href={mailtoLink()}>{BUSINESS.email}</a>
              </p>
              <h3>Address</h3>
              <p>{BUSINESS.address}</p>
              <ContactActions layout="stack" />
            </div>
            <div className="contact-aside animate-in animate-in--delay">
              <p className="contact-aside__hours-label">Business hours</p>
              <p className="contact-aside__placeholder">
                Hours to be confirmed with the business owner.
              </p>
              <p className="contact-aside__hours-label">Map</p>
              <p className="contact-aside__placeholder">Map link can be added when available.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
