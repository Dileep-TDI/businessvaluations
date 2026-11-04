# Business Valuations Online — Landing

Marketing landing page for **Business Valuations Online (BVO)**. Single-page site with services, FAQ, and a hero enquiry form that can embed a **Portal 360 CRM lead form** so submissions become CRM leads.

## Stack

| Piece | Version / notes |
| --- | --- |
| Next.js | 16 (`output: "export"` — static site) |
| React | 19 |
| Tailwind CSS | v4 |
| TypeScript | strict |

No backend in this repo. Leads are captured by the embedded Portal form (or a local demo form when Portal is not configured).

## Requirements

- Node.js 20+ recommended
- npm
- For live CRM leads: Portal 360 app running (or a deployed Portal origin) with a **published** lead form

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If Portal is already on port `3000`, run the landing on another port:

```bash
npm run dev -- -p 3001
```

## Environment

Copy `.env.example` → `.env.local` and set:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_PORTAL_ORIGIN` | Yes (for CRM) | Portal app origin, no trailing slash (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_LEAD_FORM_SLUG` | Yes (for CRM) | Published form slug from Share & embed |
| `NEXT_PUBLIC_LEAD_FORM_TITLE` | No | iframe title (default: `Enquiry form`) |

**Current local form** (from Portal Share & embed):

```text
http://localhost:3000/crm/lead-form/untitled-form-5c15ce
```

```env
NEXT_PUBLIC_PORTAL_ORIGIN=http://localhost:3000
NEXT_PUBLIC_LEAD_FORM_SLUG=untitled-form-5c15ce
NEXT_PUBLIC_LEAD_FORM_TITLE=BVO Form
```

Restart the dev server after changing env vars (`NEXT_PUBLIC_*` are inlined at start/build).

Without origin + slug, the hero shows a **local demo form** (UI only — no CRM submit).

Full embed protocol, troubleshooting, and field mapping: **[docs/PORTAL_LEAD_FORM.md](./docs/PORTAL_LEAD_FORM.md)**.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production static export → `out/` |
| `npm run start` | Serve production build (not used for pure static hosting) |
| `npm run lint` | ESLint |

## Project structure

```text
app/
  layout.tsx          # Root layout + metadata
  page.tsx            # Home page composition
  globals.css         # Design tokens + shared classes
components/
  Hero.tsx            # Hero + #enquire form mount
  EnquiryForm.tsx     # Portal embed or local fallback
  PortalLeadForm.tsx  # iframe + height/redirect postMessage
  …                   # Services, FAQ, CTAs, etc.
content/
  siteContent.ts      # Copy, nav, FAQ, form labels
lib/
  portalLeadForm.ts   # Env → embed config helpers
docs/
  PORTAL_LEAD_FORM.md # Portal integration guide
public/               # Images, favicon
```

## Editing content

Most marketing copy lives in **`content/siteContent.ts`** (headlines, services, FAQ, nav). Edit there rather than hard-coding in components.

Brand colours and form/button classes are in **`app/globals.css`**.

## Portal lead form (summary)

1. In Portal: **CRM → Lead Forms** → build & **publish** the form.
2. Open **Share & embed** → copy origin + slug (or the public URL).
3. Set env vars in `.env.local`.
4. Hero `#enquire` loads:

```text
{ORIGIN}/crm/lead-form/{SLUG}?embed=1
```

Other CTAs only scroll to `#enquire`; they do not duplicate the form.

## Build & deploy

```bash
npm run build
```

Static files are written to **`out/`**. Host that folder on any static host (S3, Netlify, Cloudflare Pages, nginx, etc.).

Ensure production env has the **production** Portal origin and published slug before building.

## Related docs

- [Portal lead form integration](./docs/PORTAL_LEAD_FORM.md)
- Portal form builder / public API: `portal360-server` (`/api/public/lead-forms/...`)
- Portal embed snippets: `portal360-client/lib/crm/lead-form-embed.ts`
