import { Link } from 'react-router-dom'
import { BUSINESS, mailtoLink, telLink } from '../../config/contact'
import { Logo } from '../Logo'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Logo />
          <p className="site-footer__tagline">
            Computer sales, repair and IT services in Pala, Kerala.
          </p>
        </div>
        <div>
          <h3 className="site-footer__heading">Services</h3>
          <ul className="site-footer__links">
            <li>
              <a href="/#services">Computer Sales &amp; Services</a>
            </li>
            <li>
              <a href="/#services">Network &amp; Security</a>
            </li>
            <li>
              <a href="/#services">Data Recovery</a>
            </li>
            <li>
              <Link to="/track">Track Repair</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="site-footer__heading">Contact</h3>
          <ul className="site-footer__contact">
            {BUSINESS.phones.map((phone) => (
              <li key={phone}>
                <a href={telLink(phone)}>{phone}</a>
              </li>
            ))}
            <li>
              <a href={mailtoLink()}>{BUSINESS.email}</a>
            </li>
            <li>{BUSINESS.address}</li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <Link to="/admin" className="site-footer__demo-link">
          Demo admin
        </Link>
      </div>
    </footer>
  )
}
