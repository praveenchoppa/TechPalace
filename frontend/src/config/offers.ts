/** Sample promotional content for demonstration — not confirmed business offers. */
export type DemoOffer = {
  id: string
  badge: string
  title: string
  description: string
  disclaimer?: string
}

export const DEMO_OFFERS: DemoOffer[] = [
  {
    id: 'demo-1',
    badge: 'Sample offer',
    title: 'Laptop health check',
    description:
      'Demonstration promo: complimentary basic diagnostics with selected service bookings. Edit or replace in src/config/offers.ts.',
    disclaimer: 'For prototype display only.',
  },
  {
    id: 'demo-2',
    badge: 'Sample offer',
    title: 'Network setup consultation',
    description:
      'Demonstration promo: on-site assessment for small office networks. Content is editable in code.',
    disclaimer: 'For prototype display only.',
  },
  {
    id: 'demo-3',
    badge: 'Sample offer',
    title: 'Accessories bundle',
    description:
      'Demonstration promo: keyboard, mouse and cable bundles for walk-in customers — placeholder copy.',
    disclaimer: 'For prototype display only.',
  },
]
