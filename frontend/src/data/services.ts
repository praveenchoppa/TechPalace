export type ServiceItem = {
  id: string
  title: string
  description: string
  icon: 'pc' | 'chip' | 'network' | 'recovery' | 'printer' | 'server' | 'cctv' | 'projector'
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'sales',
    title: 'Computer Sales & Services',
    description: 'Desktops, laptops and dependable service for home and business use.',
    icon: 'pc',
  },
  {
    id: 'chip',
    title: 'Chip-Level Services & Accessories',
    description: 'Component-level repair and quality accessories when parts need replacement.',
    icon: 'chip',
  },
  {
    id: 'network',
    title: 'Network Installation & Solutions',
    description: 'Structured cabling, Wi‑Fi and small-office network setup.',
    icon: 'network',
  },
  {
    id: 'recovery',
    title: 'Data Recovery',
    description: 'Assistance recovering data from damaged or inaccessible storage.',
    icon: 'recovery',
  },
  {
    id: 'printer',
    title: 'Printer & UPS Sales & Service',
    description: 'Printer troubleshooting, maintenance and UPS support.',
    icon: 'printer',
  },
  {
    id: 'server',
    title: 'Server Installation & Maintenance',
    description: 'Server setup, monitoring basics and ongoing maintenance.',
    icon: 'server',
  },
  {
    id: 'cctv',
    title: 'CCTV & Security Systems',
    description: 'Security camera installation and configuration.',
    icon: 'cctv',
  },
  {
    id: 'projector',
    title: 'Projector Sales & Services',
    description: 'Projector supply, lamp service and display support.',
    icon: 'projector',
  },
]
