type IconProps = { className?: string };

export function IconHandshake({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.5 12.5 11 15l5.5-5.5M7 9.5 4.8 11.7a2.2 2.2 0 0 0 0 3.1l3.4 3.4a2.2 2.2 0 0 0 3.1 0L14 15.5M17 9.5l2.2 2.2a2.2 2.2 0 0 1 0 3.1l-1.7 1.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5 12 5.5l2.8 2.8M15 8.5l1.8-1.8 2.4 2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 20v-1.2A3.8 3.8 0 0 0 12.2 15H7.8A3.8 3.8 0 0 0 4 18.8V20M14.5 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 20v-1.1a3.2 3.2 0 0 0-2.4-3.1M16.5 4.8a2.6 2.6 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconRoute({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 17h4.5a3.5 3.5 0 0 0 0-7H11a3.5 3.5 0 0 1 0-7H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconScale({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v18M8 21h8M5.5 8H12m6.5 0H12M5.5 8 3 14h5l-2.5-6ZM18.5 8 16 14h5l-2.5-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChart({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 19V5M4 19h16M8 15v-3M12 15V8M16 15v-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const needIcons = {
  handshake: IconHandshake,
  users: IconUsers,
  route: IconRoute,
  scale: IconScale,
  chart: IconChart,
} as const;
