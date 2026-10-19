import { Link } from 'react-router-dom'
import { BUSINESS } from '../config/contact'

type LogoProps = {
  compact?: boolean
}

export function Logo({ compact }: LogoProps) {
  return (
    <Link to="/" className="logo" aria-label={`${BUSINESS.name} home`}>
      <img src="/logo.svg" alt="" width={40} height={40} className="logo__mark" />
      {!compact && <span className="logo__text">{BUSINESS.name}</span>}
    </Link>
  )
}
