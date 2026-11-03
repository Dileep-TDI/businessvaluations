"use client";

import { useState } from "react";
import { site } from "@/content/siteContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Faq() {
  const { faq } = site;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={faq.id} className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{faq.title}</h2>
          </ScrollReveal>

          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <ScrollReveal key={item.question} delay={index * 70}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="text-base font-semibold leading-snug text-ink sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-teal transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-10 text-[1.02rem] leading-relaxed text-slate">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
