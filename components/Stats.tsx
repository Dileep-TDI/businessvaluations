import { site } from "@/content/siteContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Stats() {
  const { stats } = site;

  return (
    <section className="border-b border-line bg-white py-14 sm:py-16">
      <div className="section-shell">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
            {stats.eyebrow}
          </p>
        </ScrollReveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item, index) => {
            const soft = index % 2 === 1;
            return (
              <ScrollReveal key={item.label} as="li" delay={index * 90} variant="up">
                <div
                  className={`rounded-2xl px-5 py-6 shadow-[var(--shadow-soft)] ${
                    soft ? "bg-teal-soft text-ink" : "bg-ink text-white"
                  }`}
                >
                  <p className="font-display text-3xl tracking-tight sm:text-4xl">{item.value}</p>
                  <p className={`mt-2 text-sm ${soft ? "text-ink/70" : "text-white/75"}`}>
                    {item.label}
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
