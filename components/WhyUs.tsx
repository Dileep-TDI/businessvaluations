import Image from "next/image";
import { site } from "@/content/siteContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyUs() {
  const { whyUs, images } = site;

  return (
    <section id={whyUs.id} className="bg-ink py-20 text-white sm:py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <ScrollReveal variant="left" className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[var(--shadow)]">
          <Image
            src={images.whyUs}
            alt="Reviewing financial documents for a business valuation"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-transparent to-transparent"
            aria-hidden="true"
          />
        </ScrollReveal>

        <div>
          <ScrollReveal variant="right">
            <h2 className="font-display text-3xl sm:text-4xl">{whyUs.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-white/75">{whyUs.subtitle}</p>
          </ScrollReveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUs.items.map((item, index) => (
              <ScrollReveal key={item.title} as="li" delay={100 + index * 80} variant="up">
                <div className="border-l-2 border-teal pl-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-[1.02rem] leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
