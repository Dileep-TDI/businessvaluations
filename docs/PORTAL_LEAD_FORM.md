# Portal 360 lead form integration

How the BVO landing page embeds a **CRM lead form** built in Portal 360, so submissions create leads in the firm’s pipeline.

## Overview

Portal owns the form builder, validation, captcha, file uploads, thank-you / redirect behaviour, and lead creation. This landing site only **embeds** the published public form.

```
Visitor (bvo-landing)
        │
        │  iframe  ?embed=1
        ▼
Portal client  /crm/lead-form/{slug}
        │
        │  POST /api/public/lead-forms/{slug}/submit
        ▼
Portal server  → CRM lead + submission record
```

There are two official embed styles in Portal (**CRM → Lead Forms → open form → Share & embed**):

| Method | What it does |
| --- | --- |
| **Iframe embed** | Static iframe + resize/redirect listener |
| **JavaScript embed** | Creates the iframe and also forwards the host page query string (UTMs → hidden fields) |

This repo implements the same contract in React (`components/PortalLeadForm.tsx`) instead of pasting raw HTML into the page.

## Prerequisites in Portal

1. Open **Portal 360** (the app that serves `/crm/...`, not only the API).
2. Go to **CRM → Lead Forms**.
3. Build fields to match the enquiry you want (name, email, phone, position, valuation type, description, etc.).
4. Style / theme the form if needed so it fits the landing.
5. Set thank-you message or redirect URL under form settings.
6. **Publish** the form (drafts are not publicly submittable).
7. Open **Share & embed** and note:
   - **Public URL** — e.g. `https://au1.portal360.ai/crm/lead-form/bvo-enquiry`
   - **Slug** — the last path segment (`bvo-enquiry`)
   - **Origin** — scheme + host (`https://au1.portal360.ai`)

Server reference (form builder + public API):

- `portal360-server` → `PublicLeadFormsController` at `/api/public/lead-forms`
- `GET /api/public/lead-forms/:slug` — published schema
- `POST /api/public/lead-forms/:slug/submit` — creates a lead
- `POST /api/public/lead-forms/:slug/upload` — file fields (when used)

Client embed reference:

- `portal360-client/lib/crm/lead-form-embed.ts` — snippet builders + message protocol
- `portal360-client/components/crm/lead-forms/ShareModal.tsx` — Share & embed UI
- Public page: `/crm/lead-form/[slug]?embed=1`

## Configure this landing site

1. Copy env example:

```bash
cp .env.example .env.local
```

2. Set values from Share & embed:

```env
# Local Portal (Share & embed link):
# http://localhost:3000/crm/lead-form/untitled-form-5c15ce
NEXT_PUBLIC_PORTAL_ORIGIN=http://localhost:3000
NEXT_PUBLIC_LEAD_FORM_SLUG=untitled-form-5c15ce
NEXT_PUBLIC_LEAD_FORM_TITLE=BVO Form
```

Production example:

```env
NEXT_PUBLIC_PORTAL_ORIGIN=https://au1.portal360.ai
NEXT_PUBLIC_LEAD_FORM_SLUG=your-form-slug
NEXT_PUBLIC_LEAD_FORM_TITLE=Request a Business Valuation
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_PORTAL_ORIGIN` | Yes | Portal **app** origin (serves the form UI) |
| `NEXT_PUBLIC_LEAD_FORM_SLUG` | Yes | Published form slug |
| `NEXT_PUBLIC_LEAD_FORM_TITLE` | No | iframe `title` for accessibility |

3. Restart `npm run dev` (Next inlines `NEXT_PUBLIC_*` at build/start).

4. Open the hero `#enquire` section. You should see the Portal form inside an iframe, not the local demo form.

Without both origin + slug, the page keeps the **local demo form** (no CRM submit) and shows a short config notice.

## What was added in this repo

| Path | Role |
| --- | --- |
| `lib/portalLeadForm.ts` | Env → config, embed URL, height clamp, message constants |
| `components/PortalLeadForm.tsx` | iframe + `postMessage` height resize + thank-you redirect |
| `components/EnquiryForm.tsx` | Uses Portal embed when configured; else local fallback |
| `.env.example` | Documented env vars |
| `docs/PORTAL_LEAD_FORM.md` | This guide |

Hero still mounts `<EnquiryForm />` inside `#enquire`. Other CTAs only scroll to that anchor — no second form copy.

## Message protocol (how resize / redirect work)

The framed form talks to this page with `window.parent.postMessage`:

### Height — `p360-lead-form-height`

```json
{ "type": "p360-lead-form-height", "slug": "your-slug", "height": 640 }
```

`PortalLeadForm` accepts the message only when:

- `event.origin` matches `NEXT_PUBLIC_PORTAL_ORIGIN`
- `event.source` is this iframe’s `contentWindow`
- `slug` matches (when present)
- `height` is a finite number (capped at 20 000px)

That keeps the frame tall enough for the form and lets it shrink after submit (thank-you card).

### Redirect — `p360-lead-form-redirect`

When the form author configured an https thank-you URL:

```json
{ "type": "p360-lead-form-redirect", "slug": "your-slug", "url": "https://example.com/thanks" }
```

This page:

1. Acks with `{ type: "p360-lead-form-redirect-ack", url }`
2. Navigates `window.location` to that https URL (so the **landing** moves, not only the iframe)

Non-https redirect URLs are ignored.

### Query forwarding

After mount, the iframe `src` becomes:

```text
{origin}/crm/lead-form/{slug}?embed=1&{host page query string}
```

So `?utm_source=google` on the landing can fill Portal **hidden** fields that use the same keys (Portal Share → Prefill URL generator documents this).

## Local development tips

- Portal client must be reachable from the browser at `NEXT_PUBLIC_PORTAL_ORIGIN` (CORS is not required for iframe loads; API calls happen inside the Portal origin).
- Lead form routes allow framing (`frame-ancestors *` on `/crm/lead-form/*` in Portal). If the iframe is blank, check the form is **Published** and the origin/slug are correct.
- This site uses `output: "export"` — there is no Next API route proxy. The embed talks to Portal directly; that is intentional.

## Matching BVO fields in the form builder

Suggested Portal field mapping for the previous local form:

| Landing field | Suggested Portal field type |
| --- | --- |
| Full Name | Name or Short text |
| Email Address | Email |
| Phone Number | Phone |
| Your Position | Short text |
| Valuation Type | Dropdown / single choice |
| Description | Long text |

Theme the form in Portal (background, button colour) toward BVO teal `#75bd43` / ink `#2d2d2d` if you want visual continuity with the landing chrome.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Local demo form still shows | Missing/invalid env; restart dev server after editing `.env.local` |
| Empty iframe | Wrong origin/slug, or form still **Draft** |
| Cut-off form / huge empty space | Height messages blocked (ad blocker / wrong origin check) |
| Submit works but no lead | Form not published, or looking at a different Portal workspace |
| Thank-you stays inside the frame | Redirect URL missing/`http:` — only `https:` is accepted by the host listener |
| UTMs not captured | Add matching **hidden** fields in the Portal form; use keys that match query params |

## Optional: paste Portal’s raw snippet instead

If you prefer zero React glue, you can paste the **JavaScript embed** from Share & embed into a static HTML host. Prefer the React component here so height, redirect, and env-based slug stay under version control with the landing.
