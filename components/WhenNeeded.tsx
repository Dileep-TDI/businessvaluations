import { site } from "@/content/siteContent";
import { needIcons } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhenNeeded() {
  const { whenNeeded } = site;

  return (
    <section id={whenNeeded.id} className="relative overflow-hidden bg-mist py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(117,189,67,0.55),transparent)]"
        aria-hidden="true"
      />

      <div className="section-shell">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Common situations
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {whenNeeded.title}
          </h2>
          <div className="mt-5 h-1 w-14 rounded-full bg-teal" aria-hidden="true" />
        </ScrollReveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {whenNeeded.items.map((item, index) => {
            const Icon = needIcons[item.icon];
            return (
              <ScrollReveal
                key={item.title}
                as="li"
                delay={index * 90}
                variant="up"
              >
                <div className="need-item group relative flex h-full flex-col gap-4 rounded-2xl border border-[rgba(45,45,45,0.08)] bg-white/70 px-5 py-6 backdrop-blur-[2px] transition-colors hover:border-teal/35 hover:bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="need-icon inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white shadow-[0_10px_24px_rgba(117,189,67,0.28)]"
                      style={{ animationDelay: `${index * 90 + 60}ms` }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className="font-display text-sm font-semibold tabular-nums text-teal/45"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-[1.05rem] font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
