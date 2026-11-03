import { site } from "@/content/siteContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Services() {
  const { services } = site;

  return (
    <section id={services.id} className="bg-paper py-20 sm:py-24">
      <div className="section-shell">
        <ScrollReveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{services.title}</h2>
        </ScrollReveal>

        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {services.items.map((item, index) => (
            <ScrollReveal
              key={item.title}
              as="li"
              delay={(index % 2) * 100 + Math.floor(index / 2) * 80}
            >
              <div className="border-t border-line pt-6">
                <h3 className="font-display text-xl text-ink sm:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-slate">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal delay={120} className="mt-12">
          <a href={services.ctaHref} className="btn-secondary">
            {services.cta}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
