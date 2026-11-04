/**
 * Portal 360 public lead-form embed helpers.
 *
 * Contract mirrors portal360-client `lib/crm/lead-form-embed.ts`:
 * the published form lives at `{origin}/crm/lead-form/{slug}?embed=1`
 * and posts height / thank-you redirect messages to the host page.
 */

export const FORM_HEIGHT_MESSAGE = "p360-lead-form-height";
export const FORM_REDIRECT_MESSAGE = "p360-lead-form-redirect";
export const FORM_REDIRECT_ACK = "p360-lead-form-redirect-ack";
export const MAX_FRAME_HEIGHT = 20000;
export const DEFAULT_FRAME_HEIGHT = 480;

export type PortalLeadFormConfig = {
  /** Portal app origin, e.g. https://au1.portal360.ai */
  origin: string;
  /** Published form slug from CRM → Lead Forms → Share & embed */
  slug: string;
  /** Accessible iframe title */
  title: string;
  /** Full public form URL (without ?embed=1) */
  publicUrl: string;
  /** Iframe src including ?embed=1 and optional host query forwarding */
  embedUrl: string;
};

export function clampFrameHeight(height: number): number {
  if (!Number.isFinite(height)) return 0;
  return Math.min(MAX_FRAME_HEIGHT, Math.max(0, Math.ceil(height)));
}

/** Strip trailing slash so `/crm/...` joins cleanly. */
export function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, "");
}

export function buildPublicLeadFormUrl(origin: string, slug: string): string {
  return `${normalizeOrigin(origin)}/crm/lead-form/${encodeURIComponent(slug)}`;
}

/**
 * Build the iframe src. Forwards the host page query string (UTMs, etc.)
 * the same way Portal's JavaScript embed snippet does.
 */
export function buildEmbedSrc(publicUrl: string, search = ""): string {
  const base = `${publicUrl}?embed=1`;
  if (!search || search === "?") return base;
  const qs = search.startsWith("?") ? search.slice(1) : search;
  return qs ? `${base}&${qs}` : base;
}

export function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Resolve config from public env vars.
 * Returns null when Portal is not configured so the landing can keep a local fallback.
 */
export function getPortalLeadFormConfig(): PortalLeadFormConfig | null {
  const origin = process.env.NEXT_PUBLIC_PORTAL_ORIGIN?.trim();
  const slug = process.env.NEXT_PUBLIC_LEAD_FORM_SLUG?.trim();
  const title =
    process.env.NEXT_PUBLIC_LEAD_FORM_TITLE?.trim() || "Enquiry form";

  if (!origin || !slug) return null;

  const publicUrl = buildPublicLeadFormUrl(origin, slug);
  return {
    origin: normalizeOrigin(origin),
    slug,
    title,
    publicUrl,
    embedUrl: buildEmbedSrc(publicUrl),
  };
}
