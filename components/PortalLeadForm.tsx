"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_FRAME_HEIGHT,
  FORM_HEIGHT_MESSAGE,
  FORM_REDIRECT_ACK,
  FORM_REDIRECT_MESSAGE,
  buildEmbedSrc,
  clampFrameHeight,
  isHttpsUrl,
  type PortalLeadFormConfig,
} from "@/lib/portalLeadForm";

type PortalLeadFormProps = {
  config: PortalLeadFormConfig;
  className?: string;
};

/**
 * Embeds a published Portal 360 CRM lead form.
 *
 * Same contract as Portal's Share & embed snippets:
 * - iframe loads `{origin}/crm/lead-form/{slug}?embed=1`
 * - form posts `p360-lead-form-height` so the frame can grow/shrink
 * - form posts `p360-lead-form-redirect` for thank-you navigation on the host page
 * - host query string is forwarded for UTM / hidden field prefills
 */
export function PortalLeadForm({ config, className }: PortalLeadFormProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(DEFAULT_FRAME_HEIGHT);
  const [src, setSrc] = useState(config.embedUrl);

  useEffect(() => {
    setSrc(buildEmbedSrc(config.publicUrl, window.location.search));
  }, [config.publicUrl]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== config.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;

      const data = event.data as {
        type?: unknown;
        slug?: unknown;
        height?: unknown;
        url?: unknown;
      } | null;
      if (!data || typeof data !== "object") return;
      if (data.slug && data.slug !== config.slug) return;

      if (data.type === FORM_REDIRECT_MESSAGE) {
        if (typeof data.url !== "string" || !isHttpsUrl(data.url)) return;
        try {
          event.source?.postMessage(
            { type: FORM_REDIRECT_ACK, url: data.url },
            event.origin,
          );
        } catch {
          // Ack is best-effort; navigation still proceeds.
        }
        window.location.href = data.url;
        return;
      }

      if (data.type !== FORM_HEIGHT_MESSAGE) return;
      if (typeof data.height !== "number") return;
      setHeight(clampFrameHeight(data.height));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [config.origin, config.slug]);

  return (
    <div className={className}>
      <iframe
        ref={iframeRef}
        id={`p360-lead-form-${config.slug}`}
        title={config.title}
        src={src}
        scrolling="no"
        className="w-full border-0 bg-transparent"
        style={{ height, minHeight: 240 }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
