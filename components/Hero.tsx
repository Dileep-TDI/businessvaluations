import Image from "next/image";
import { site } from "@/content/siteContent";
import { EnquiryForm } from "@/components/EnquiryForm";

export function Hero() {
  const { hero, images } = site;

  return (
    <section id="top" className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover object-center"
        />
      </div>
      <div className="hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="section-shell relative grid gap-8 pb-10 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-12 lg:pt-24">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="animate-rise text-sm font-semibold uppercase tracking-[0.2em] text-sky">
            {hero.eyebrow}
          </p>
          <h1 className="animate-rise-delay-1 font-display mt-3 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            {hero.headline}
          </h1>
          <p className="animate-rise-delay-2 mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/80 sm:text-[1.05rem] lg:mx-0">
            {hero.subheadline}
          </p>
          <p className="animate-rise-delay-2 mt-3 text-sm font-medium leading-relaxed text-teal-soft">
            {hero.trustLine}
          </p>
        </div>

        <div id="enquire" className="animate-rise-delay-3 mx-auto w-full max-w-xl scroll-mt-24 lg:mx-0 lg:max-w-none">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
