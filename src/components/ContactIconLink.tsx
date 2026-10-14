type ContactIcon = 'github' | 'googlescholar' | 'x' | 'instagram' | 'email';

export function ContactIconLink({
  href,
  name,
  icon,
}: {
  href: string;
  name: string;
  icon: ContactIcon;
}) {
  return (
    <a className="contact-icon-link" href={href} aria-label={name} title={name}>
      {icon === 'email' ? (
        <svg
          className="contact-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </svg>
      ) : (
        <span
          className="contact-icon"
          aria-hidden="true"
          style={{ maskImage: `url(/assets/tool-icons/${icon}.svg)` }}
        />
      )}
    </a>
  );
}
