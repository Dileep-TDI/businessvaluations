import { site } from "@/content/siteContent";
import { needIcons } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhenNeeded() {
  const { whenNeeded } = site;

  return (
    <section id={whenNeeded.id} className="bg-mist py-20 sm:py-24">
      <div className="section-shell">
        <ScrollReveal>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{whenNeeded.title}</h2>
        </ScrollReveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {whenNeeded.items.map((item, index) => {
            const Icon = needIcons[item.icon];
            return (
              <ScrollReveal
                key={item.title}
                as="li"
                delay={index * 110}
                variant="scale"
              >
                <div className="need-item flex flex-col gap-3">
                  <span
                    className="need-icon inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-teal shadow-[var(--shadow-soft)] ring-1 ring-teal/15"
                    style={{ animationDelay: `${index * 110 + 80}ms` }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate">{item.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
