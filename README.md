# FixFeet — קליניקת פיזיותרפיה

Next.js 14 website for **fixfeet.co.il**, a professional physiotherapy clinic specialising in foot health, rehabilitation, and sports injuries.

## Tech Stack

- **Next.js 14** (App Router)
- **next-intl** — i18n (Hebrew default, English secondary)
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — entrance animations & scroll reveals
- **shadcn/ui** inspired components (Button, Card, Badge, Input, Label)
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```env
# Optional: set to enable site-wide password protection
SITE_PASSWORD=your_secret_password
```

## Features

- **Full i18n** — Hebrew (RTL, default) and English with `next-intl`
- **Appointment booking** — form with service, date/time picker; WhatsApp deeplink
- **Password gate** — optional site-wide protection via `SITE_PASSWORD` env var
- **SEO** — `generateMetadata`, JSON-LD LocalBusiness schema, sitemap, robots.txt, hreflang
- **Responsive** — mobile-first, 375px minimum width
- **WCAG AA** — accessible colour contrast, touch targets ≥ 44×44px

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home (hero, services, stats, CTA) |
| `/booking` | Appointment booking form |
| `/contact` | Contact info + message form |
| `/unlock` | Password gate (when `SITE_PASSWORD` is set) |

All routes are available in both Hebrew (`/`) and English (`/en/`).

## Deployment

Deploy to [Vercel](https://vercel.com) for zero-config Next.js hosting. Set `SITE_PASSWORD` in the Vercel dashboard if you want to password-protect the site.
