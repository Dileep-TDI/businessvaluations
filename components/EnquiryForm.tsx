"use client";

import { FormEvent, useState } from "react";
import { ThemeSelect } from "@/components/ThemeSelect";
import { PortalLeadForm } from "@/components/PortalLeadForm";
import { site } from "@/content/siteContent";
import { getPortalLeadFormConfig } from "@/lib/portalLeadForm";

const fields = site.form.fields;
const portalConfig = getPortalLeadFormConfig();

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  valuationType: string;
  description: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  valuationType: "",
  description: "",
};

/**
 * Hero enquiry form.
 *
 * When `NEXT_PUBLIC_PORTAL_ORIGIN` + `NEXT_PUBLIC_LEAD_FORM_SLUG` are set,
 * renders the published Portal 360 lead form embed (leads land in CRM).
 * Otherwise falls back to the local demo form (no API submit).
 */
export function EnquiryForm() {
  if (portalConfig) {
    return (
      <PortalLeadForm
        config={portalConfig}
        className="overflow-hidden rounded-xl bg-white shadow-[var(--shadow)]"
      />
    );
  }

  return <LocalEnquiryForm />;
}

function LocalEnquiryForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);
    if (!values.valuationType) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="overflow-hidden rounded-xl bg-white shadow-[var(--shadow)]">
        <div className="h-1.5 bg-teal" aria-hidden="true" />
        <div className="p-4 sm:p-5">
          <p className="font-display text-2xl text-ink">{site.form.successTitle}</p>
          <p className="mt-2 text-slate leading-relaxed">{site.form.successMessage}</p>
          <button
            type="button"
            className="btn-primary mt-4"
            onClick={() => {
              setValues(initialState);
              setSubmitted(false);
              setAttemptedSubmit(false);
            }}
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-xl bg-white shadow-[var(--shadow)]"
    >
      <div className="h-1.5 bg-teal" aria-hidden="true" />
      <div className="p-4 sm:p-5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium text-ink sm:col-span-2">
            {fields.fullName.label}
            <input
              className="field"
              name="fullName"
              autoComplete="name"
              required={fields.fullName.required}
              placeholder={fields.fullName.placeholder}
              value={values.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-ink">
            {fields.email.label}
            <input
              className="field"
              type="email"
              name="email"
              autoComplete="email"
              required={fields.email.required}
              placeholder={fields.email.placeholder}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-ink">
            {fields.phone.label}
            <input
              className="field"
              type="tel"
              name="phone"
              autoComplete="tel"
              required={fields.phone.required}
              placeholder={fields.phone.placeholder}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-ink">
            {fields.position.label}
            <input
              className="field"
              name="position"
              autoComplete="organization-title"
              required={fields.position.required}
              placeholder={fields.position.placeholder}
              value={values.position}
              onChange={(e) => update("position", e.target.value)}
            />
          </label>

          <ThemeSelect
            label={fields.valuationType.label}
            name="valuationType"
            required={fields.valuationType.required}
            value={values.valuationType}
            options={fields.valuationType.options}
            placeholder="Select a type"
            showError={attemptedSubmit}
            onChange={(value) => update("valuationType", value)}
          />

          <label className="grid gap-1.5 text-sm font-medium text-ink sm:col-span-2">
            {fields.description.label}
            <textarea
              className="field min-h-16 resize-y"
              name="description"
              required={fields.description.required}
              placeholder={fields.description.placeholder}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
            />
          </label>
        </div>

        <button type="submit" className="btn-primary mt-3.5">
          {site.form.submitLabel}
        </button>
      </div>
    </form>
  );
}
