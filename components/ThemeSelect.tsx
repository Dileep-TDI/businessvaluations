"use client";

import { useEffect, useId, useRef, useState } from "react";

type ThemeSelectProps = {
  label: string;
  name: string;
  value: string;
  options: readonly string[];
  required?: boolean;
  placeholder?: string;
  /** Show validation error only after the parent form has been submitted */
  showError?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export function ThemeSelect({
  label,
  name,
  value,
  options,
  required = false,
  placeholder = "Select a type",
  showError = false,
  errorMessage = "Please select a valuation type",
  onChange,
}: ThemeSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const invalid = required && showError && !value;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative grid gap-1.5 text-sm font-medium text-ink">
      <span id={`${listId}-label`}>{label}</span>

      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        className={`field flex items-center justify-between gap-3 text-left ${
          open ? "field-open" : ""
        } ${invalid ? "border-[#e15555]" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${listId}-label`}
        aria-controls={listId}
        aria-invalid={invalid}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={value ? "text-ink" : "text-slate/70"}>{value || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-[#75bd43] transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${listId}-label`}
          className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-lg border border-[#75bd43]/55 bg-white py-1 shadow-[var(--shadow)]"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full px-3.5 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "bg-[#75bd43] text-white"
                      : "text-ink hover:bg-[#F0FFD0]"
                  }`}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {invalid ? (
        <span className="text-xs font-normal text-[#c0392b]">{errorMessage}</span>
      ) : null}
    </div>
  );
}
