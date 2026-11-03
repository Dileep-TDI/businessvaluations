/**
 * Central content for the Business Valuations Online landing page.
 * Edit copy, CTAs, and form options here — components read from this file.
 */

export const site = {
  brand: "Business Valuations Online",
  brandShort: "BVO",
  meta: {
    title: "Business Valuation Services | Business Valuations Online",
    description:
      "Professional business, company and startup valuations from experienced valuers and forensic accountants. Led by Brett Goodyer, valuing businesses since 1993.",
  },
  images: {
    logo: "/images/logo-white.webp",
    logoWidth: 458,
    logoHeight: 201,
    favicon: "/favicon.webp",
    hero: "/images/hero-office.webp",
    whyUs: "/images/why-us-desk.webp",
    cta: "/images/cta-skyline.webp",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "When You Need Us", href: "#when-needed" },
    { label: "Why Us", href: "#why-us" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    eyebrow: "Business Valuation Services",
    headline: "Know What Your Business Is Worth",
    subheadline:
      "Professional business, company and startup valuations from experienced valuers and forensic accountants.",
    trustLine:
      "1,000+ businesses valued · Led by Brett Goodyer, valuing businesses since 1993",
  },
  form: {
    fields: {
      fullName: { label: "Full Name", placeholder: "Jane Smith", required: true },
      email: {
        label: "Email Address",
        placeholder: "jane@company.com",
        required: true,
      },
      phone: {
        label: "Phone Number",
        placeholder: "+61 4XX XXX XXX",
        required: true,
      },
      position: {
        label: "Your Position",
        placeholder: "Owner / Director / Advisor",
        required: true,
      },
      valuationType: {
        label: "Valuation Type",
        required: true,
        options: [
          "Business Valuation",
          "Business Appraisal",
          "Company Valuation",
          "Startup Valuation",
          "Other",
        ],
      },
      description: {
        label: "Description",
        placeholder: "Tell us about the business and what you need…",
        required: true,
      },
    },
    submitLabel: "Request a Business Valuation",
    successTitle: "Thank you — enquiry received",
    successMessage:
      "Our team will be in touch shortly to discuss your valuation requirements.",
  },
  services: {
    id: "services",
    title: "Our Valuation Services",
    items: [
      {
        title: "Business Valuation",
        description:
          "A professional assessment of a business’s financial position, earnings and key value drivers. Suitable for sales, purchases, partner changes and planning.",
      },
      {
        title: "Business Appraisal",
        description:
          "A clear view of what a business is worth, to support your commercial decisions with confidence.",
      },
      {
        title: "Company Valuation",
        description:
          "A valuation of a company based on its financials, operations and relevant market factors. Suitable for private and closely held companies.",
      },
      {
        title: "Startup Valuation",
        description:
          "A valuation that considers your business model, financial position and growth prospects, including early-stage and pre-revenue startups.",
      },
    ],
    cta: "Request a Business Valuation",
    ctaHref: "#enquire",
  },
  whenNeeded: {
    id: "when-needed",
    title: "When You May Need a Valuation",
    items: [
      {
        icon: "handshake" as const,
        title: "Buying or selling a business",
        description: "Know a fair value before you negotiate.",
      },
      {
        icon: "users" as const,
        title: "Partner or shareholder changes",
        description: "Support buy-ins, buyouts and exits.",
      },
      {
        icon: "route" as const,
        title: "Succession and exit planning",
        description:
          "Understand what the business is worth before you plan your next step.",
      },
      {
        icon: "scale" as const,
        title: "Disputes and legal matters",
        description: "Get an independent, well-supported valuation.",
      },
      {
        icon: "chart" as const,
        title: "Funding and investment",
        description: "Back your discussions with lenders and investors.",
      },
    ],
  },
  whyUs: {
    id: "why-us",
    title: "Why Business Valuations Online",
    subtitle: "Experience and expertise you can rely on",
    items: [
      {
        title: "1,000+ businesses valued",
        description: "A track record across a wide range of businesses.",
      },
      {
        title: "Led by Brett Goodyer",
        description: "Valuation experience dating back to 1993.",
      },
      {
        title: "Forensic accounting support",
        description:
          "Your valuation is backed by a team of forensic accountants and valuation professionals.",
      },
      {
        title: "Built for SMEs",
        description:
          "Experience working with small and medium-sized businesses.",
      },
    ],
  },
  howItWorks: {
    id: "how-it-works",
    title: "How It Works",
    subtitle: "A straightforward valuation process",
    steps: [
      {
        number: "1",
        title: "Enquire",
        description: "Tell us about the business and what you need.",
      },
      {
        number: "2",
        title: "Discuss",
        description: "We confirm the purpose and scope of your valuation.",
      },
      {
        number: "3",
        title: "Valuation",
        description: "Once the scope and engagement are agreed, we begin.",
      },
    ],
    cta: "Enquire About a Valuation",
    ctaHref: "#enquire",
  },
  faq: {
    id: "faq",
    title: "Frequently Asked Questions",
    items: [
      {
        question:
          "What is the difference between a business valuation and a business appraisal?",
        answer:
          "The terms are often used interchangeably. Tell us what you need and we’ll confirm the right approach for your purpose.",
      },
      {
        question: "Do you value startups and pre-revenue businesses?",
        answer:
          "Yes. Startup valuations consider the business model, financial position and growth prospects.",
      },
      {
        question: "What information will I need to provide?",
        answer:
          "It depends on the purpose and scope. We’ll discuss this with you after your enquiry.",
      },
      {
        question: "How do I get started?",
        answer:
          "Submit the enquiry form and our team will be in touch to discuss your requirements.",
      },
    ],
  },
  finalCta: {
    title: "Need to know what a business is worth?",
    subtitle: "Tell us what you need and we’ll take it from there.",
    cta: "Enquire About a Valuation",
    ctaHref: "#enquire",
  },
  stickyBar: {
    text: "Need to know what a business is worth?",
    cta: "Enquire About a Valuation",
    ctaHref: "#enquire",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Business Valuations Online. All rights reserved.`,
  },
} as const;

export type SiteContent = typeof site;
