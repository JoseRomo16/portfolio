const P = { "aria-hidden": true } as const;

export const ArrowUpRight = ({ c = "size-3.5" }: { c?: string }) => (
  <svg viewBox="0 0 16 16" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeft = ({ c = "size-4" }: { c?: string }) => (
  <svg viewBox="0 0 16 16" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <path d="M10 3.5 5.5 8l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRight = ({ c = "size-4" }: { c?: string }) => (
  <svg viewBox="0 0 16 16" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GitHub = ({ c = "size-[18px]" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="currentColor" {...P}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

export const LinkedIn = ({ c = "size-[18px]" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="currentColor" {...P}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const Mail = ({ c = "size-[18px]" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhatsApp = ({ c = "size-[18px]" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="currentColor" {...P}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35ZM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03C2.56 6.83 6.8 2.6 12.04 2.6c2.54 0 4.92.99 6.71 2.78a9.42 9.42 0 0 1 2.78 6.7c0 5.23-4.25 9.42-9.49 9.42Zm8.08-17.5A11.32 11.32 0 0 0 12.04.66C5.74.66.62 5.78.62 12.08c0 2.01.53 3.98 1.53 5.71L.53 23.7l6.05-1.59a11.4 11.4 0 0 0 5.45 1.39h.01c6.3 0 11.42-5.12 11.42-11.42 0-3.05-1.19-5.92-3.34-8.08Z" />
  </svg>
);

export const Download = ({ c = "size-4" }: { c?: string }) => (
  <svg viewBox="0 0 16 16" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sun = ({ c = "size-[18px]" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" strokeLinecap="round" />
  </svg>
);

export const Moon = ({ c = "size-[18px]" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" {...P}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
  </svg>
);
