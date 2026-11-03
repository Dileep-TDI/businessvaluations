import { site } from "@/content/siteContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export function HowItWorks() {
  const { howItWorks } = site;

  return (
    <section id={howItWorks.id} className="bg-paper py-20 sm:py-24">
      <div className="section-shell">
        <ScrollReveal className="max-w-2xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{howItWorks.title}</h2>
          <p className="mt-3 text-lg text-slate">{howItWorks.subtitle}</p>
        </ScrollReveal>

        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <ScrollReveal key={step.number} as="li" delay={index * 120} className="relative">
              {index < howItWorks.steps.length - 1 && (
                <span
                  className="absolute left-[4.5rem] top-7 hidden h-px w-[calc(100%-3rem)] bg-line md:block"
                  aria-hidden="true"
                />
              )}
              <span className="font-display text-4xl text-teal">{step.number}</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs text-[1.02rem] leading-relaxed text-slate">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal delay={160} className="mt-12">
          <a href={howItWorks.ctaHref} className="btn-secondary">
            {howItWorks.cta}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
