import type { ReactNode } from 'react';

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function TextLink({
  href,
  children,
  className = 'text-link',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href}>
      {children} <Arrow />
    </a>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags">
      {items.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="eyebrow section-label">
      <span>{number}</span> {children}
    </p>
  );
}

export function PageIntro({
  number,
  label,
  heading,
  description,
  actions,
}: {
  number: string;
  label: string;
  heading: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <SectionLabel number={number}>{label}</SectionLabel>
      <h1>{heading}</h1>
      <div className="intro-bottom">
        <p className="lead">{description}</p>
        {actions && <div className="inline-links">{actions}</div>}
      </div>
    </section>
  );
}
