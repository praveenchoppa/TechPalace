import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from '../Logo'

const navItems = [
  { to: '/#home', label: 'Home', hash: true },
  { to: '/#services', label: 'Services', hash: true },
  { to: '/#offers', label: 'Offers', hash: true },
  { to: '/track', label: 'Track Repair', hash: false },
  { to: '/#contact', label: 'Contact', hash: true },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
        <nav id="primary-nav" className={`site-nav ${open ? 'site-nav--open' : ''}`}>
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.hash ? (
                  <a href={item.to} className="site-nav__link" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <Link to="/track" className="btn btn--primary btn--sm site-nav__cta" onClick={() => setOpen(false)}>
            Track Your Repair
          </Link>
        </nav>
      </div>
    </header>
  )
}
