import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(path.join(dir, "../content/siteContent.ts"), "utf8");
const js = raw
  .replace(/^\/\*[\s\S]*?\*\/\s*/m, "")
  .replace(/export const site = /, "export default ")
  .replace(/ as const/g, "")
  .replace(/;\s*export type[\s\S]*$/m, ";");
const tmp = path.join(dir, "_site.tmp.mjs");
writeFileSync(tmp, js);
const { default: site } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
unlinkSync(tmp);

const expected = {
  eyebrow: "Business Valuation Services",
  headline: "Know What Your Business Is Worth",
  subheadline:
    "Professional business, company and startup valuations from experienced valuers and forensic accountants.",
  trustLine:
    "1,000+ businesses valued · Led by Brett Goodyer, valuing businesses since 1993",
  formLabels: [
    "Full Name",
    "Email Address",
    "Phone Number",
    "Your Position",
    "Valuation Type",
    "Description",
  ],
  formOptions: [
    "Business Valuation",
    "Business Appraisal",
    "Company Valuation",
    "Startup Valuation",
    "Other",
  ],
  formCta: "Request a Business Valuation",
  servicesTitle: "Our Valuation Services",
  services: [
    [
      "Business Valuation",
      "A professional assessment of a business's financial position, earnings and key value drivers. Suitable for sales, purchases, partner changes and planning.",
    ],
    [
      "Business Appraisal",
      "A clear view of what a business is worth, to support your commercial decisions with confidence.",
    ],
    [
      "Company Valuation",
      "A valuation of a company based on its financials, operations and relevant market factors. Suitable for private and closely held companies.",
    ],
    [
      "Startup Valuation",
      "A valuation that considers your business model, financial position and growth prospects, including early-stage and pre-revenue startups.",
    ],
  ],
  servicesCta: "Request a Business Valuation",
  whenTitle: "When You May Need a Valuation",
  when: [
    ["Buying or selling a business", "Know a fair value before you negotiate."],
    ["Partner or shareholder changes", "Support buy-ins, buyouts and exits."],
    [
      "Succession and exit planning",
      "Understand what the business is worth before you plan your next step.",
    ],
    ["Disputes and legal matters", "Get an independent, well-supported valuation."],
    ["Funding and investment", "Back your discussions with lenders and investors."],
  ],
  whyTitle: "Why Business Valuations Online",
  whySub: "Experience and expertise you can rely on",
  why: [
    ["1,000+ businesses valued", "A track record across a wide range of businesses."],
    ["Led by Brett Goodyer", "Valuation experience dating back to 1993."],
    [
      "Forensic accounting support",
      "Your valuation is backed by a team of forensic accountants and valuation professionals.",
    ],
    ["Built for SMEs", "Experience working with small and medium-sized businesses."],
  ],
  howTitle: "How It Works",
  howSub: "A straightforward valuation process",
  how: [
    ["Enquire", "Tell us about the business and what you need."],
    ["Discuss", "We confirm the purpose and scope of your valuation."],
    ["Valuation", "Once the scope and engagement are agreed, we begin."],
  ],
  howCta: "Enquire About a Valuation",
  faqTitle: "Frequently Asked Questions",
  faq: [
    [
      "What is the difference between a business valuation and a business appraisal?",
      "The terms are often used interchangeably. Tell us what you need and we'll confirm the right approach for your purpose.",
    ],
    [
      "Do you value startups and pre-revenue businesses?",
      "Yes. Startup valuations consider the business model, financial position and growth prospects.",
    ],
    [
      "What information will I need to provide?",
      "It depends on the purpose and scope. We'll discuss this with you after your enquiry.",
    ],
    [
      "How do I get started?",
      "Submit the enquiry form and our team will be in touch to discuss your requirements.",
    ],
  ],
  finalTitle: "Need to know what a business is worth?",
  finalSub: "Tell us what you need and we'll take it from there.",
  finalCta: "Enquire About a Valuation",
};

const norm = (s) =>
  String(s)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .trim();

let fails = 0;
function check(label, got, exp) {
  if (norm(got) === norm(exp)) {
    console.log("OK  ", label);
    return;
  }
  fails++;
  console.log("FAIL", label);
  console.log("  got:", JSON.stringify(got));
  console.log("  exp:", JSON.stringify(exp));
}

check("1.eyebrow", site.hero.eyebrow, expected.eyebrow);
check("1.headline", site.hero.headline, expected.headline);
check("1.subheadline", site.hero.subheadline, expected.subheadline);
check("1.trustLine", site.hero.trustLine, expected.trustLine);

const labels = [
  site.form.fields.fullName.label,
  site.form.fields.email.label,
  site.form.fields.phone.label,
  site.form.fields.position.label,
  site.form.fields.valuationType.label,
  site.form.fields.description.label,
];
expected.formLabels.forEach((l, i) => check(`1.form.label.${i}`, labels[i], l));
[...site.form.fields.valuationType.options].forEach((o, i) =>
  check(`1.form.option.${i}`, o, expected.formOptions[i]),
);
check("1.form.cta", site.form.submitLabel, expected.formCta);

check("2.title", site.services.title, expected.servicesTitle);
expected.services.forEach(([t, d], i) => {
  check(`2.item.${i}`, site.services.items[i].title, t);
  check(`2.desc.${i}`, site.services.items[i].description, d);
});
check("2.cta", site.services.cta, expected.servicesCta);

check("3.title", site.whenNeeded.title, expected.whenTitle);
expected.when.forEach(([t, d], i) => {
  check(`3.item.${i}`, site.whenNeeded.items[i].title, t);
  check(`3.desc.${i}`, site.whenNeeded.items[i].description, d);
});

check("4.title", site.whyUs.title, expected.whyTitle);
check("4.subtitle", site.whyUs.subtitle, expected.whySub);
expected.why.forEach(([t, d], i) => {
  check(`4.item.${i}`, site.whyUs.items[i].title, t);
  check(`4.desc.${i}`, site.whyUs.items[i].description, d);
});

check("5.title", site.howItWorks.title, expected.howTitle);
check("5.subtitle", site.howItWorks.subtitle, expected.howSub);
expected.how.forEach(([t, d], i) => {
  check(`5.step.${i}`, site.howItWorks.steps[i].title, t);
  check(`5.desc.${i}`, site.howItWorks.steps[i].description, d);
});
check("5.cta", site.howItWorks.cta, expected.howCta);

check("6.title", site.faq.title, expected.faqTitle);
expected.faq.forEach(([q, a], i) => {
  check(`6.q.${i}`, site.faq.items[i].question, q);
  check(`6.a.${i}`, site.faq.items[i].answer, a);
});

check("7.title", site.finalCta.title, expected.finalTitle);
check("7.subtitle", site.finalCta.subtitle, expected.finalSub);
check("7.cta", site.finalCta.cta, expected.finalCta);

console.log("\n" + (fails ? `${fails} FAILURES` : "ALL CONTENT MATCHES 100%"));
process.exit(fails ? 1 : 0);
