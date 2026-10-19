import type { ReactNode } from 'react'
import type { ServiceItem } from '../data/services'

const paths: Record<ServiceItem['icon'], ReactNode> = {
  pc: (
    <path
      d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 14h8M8 20h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  network: (
    <path
      d="M12 4v4M8 12h8M6 20h12M12 12v8M4 12a8 8 0 0116 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
  recovery: (
    <path
      d="M12 4v4m0 8v4M4 12h4m8 0h4M7.05 7.05l2.83 2.83m4.24 4.24l2.83 2.83M7.05 16.95l2.83-2.83m4.24-4.24l2.83-2.83"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
  printer: (
    <path
      d="M6 10V6h12v4M6 14h12v6H6v-6zm-2 4h16a2 2 0 002-2v-2a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="7" r="1" fill="currentColor" />
      <circle cx="8" cy="17" r="1" fill="currentColor" />
    </>
  ),
  cctv: (
    <path
      d="M4 8h4l2-3h4l2 3h4v10H4V8zm8 3a3 3 0 100 6 3 3 0 000-6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  projector: (
    <path
      d="M5 10h14l-2 8H7l-2-8zm7-6v4M12 4l3 2M12 4L9 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}

export function ServiceIcon({ icon }: { icon: ServiceItem['icon'] }) {
  return (
    <svg className="service-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      {paths[icon]}
    </svg>
  )
}
