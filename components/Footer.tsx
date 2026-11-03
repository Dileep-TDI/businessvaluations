import Image from "next/image";
import { site } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-24 pt-10 text-white lg:pb-10">
      <div className="section-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Image
            src={site.images.logo}
            alt={site.brand}
            width={site.images.logoWidth}
            height={site.images.logoHeight}
            unoptimized
            className="h-14 w-auto object-contain object-left sm:h-16"
          />
          <p className="mt-3 text-sm text-white/65">Professional business valuation services</p>
        </div>
        <p className="text-sm text-white/55">{site.footer.copyright}</p>
      </div>
    </footer>
  );
}
