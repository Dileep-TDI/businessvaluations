import { site } from "@/content/siteContent";

export function StickyCta() {
  const { stickyBar } = site;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <p className="min-w-0 flex-1 text-xs leading-snug text-white/75">{stickyBar.text}</p>
        <a
          href={stickyBar.ctaHref}
          className="shrink-0 rounded-full bg-teal px-3.5 py-2.5 text-center text-xs font-semibold leading-tight text-white no-underline hover:bg-teal-deep sm:text-sm"
        >
          {stickyBar.cta}
        </a>
      </div>
    </div>
  );
}
