# Tech Palace Systems — Website Prototype

Premium demo site for **Tech Palace Systems** (Pala, Kerala): public homepage, customer repair tracking, and a **demo-only** admin dashboard.

## Run locally

```bash
npm install
npm run dev
```

- Public site: `http://localhost:5173/`
- Track repair: `/track`
- Demo admin: `/admin`

## Demo workflow

1. Open `/admin` and add a repair (note the generated `TP-xxxx` ID).
2. Edit the record: update status, cost, and customer-visible message.
3. Open `/track` and search with that ID.

Data is stored in **localStorage** in the current browser only (`techpalace_repairs_v1`).

## Configuration

- **WhatsApp:** set `WHATSAPP_NUMBER` in `src/config/contact.ts` (country code, no `+`).
- **Offers:** edit sample promos in `src/config/offers.ts`.

## Build

```bash
npm run build
npm run preview
```
