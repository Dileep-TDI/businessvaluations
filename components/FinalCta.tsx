import Image from "next/image";
import { site } from "@/content/siteContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export function FinalCta() {
  const { finalCta, images } = site;

  return (
    <section className="relative overflow-hidden py-24 text-white sm:py-28">
      <div className="absolute inset-0 -z-20">
        <Image
          src={images.cta}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="cta-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="section-shell relative text-center">
        <ScrollReveal variant="scale">
          <h2 className="font-display mx-auto max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{finalCta.subtitle}</p>
          <div className="mt-8">
            <a
              href={finalCta.ctaHref}
              className="inline-flex rounded-full bg-teal px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-teal-deep"
            >
              {finalCta.cta}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
