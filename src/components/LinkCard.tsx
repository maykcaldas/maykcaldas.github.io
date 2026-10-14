import type { ReactNode } from 'react';
import { Arrow } from './Primitives';

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  actionLabel: string;
  headingLevel?: 'h2' | 'h3';
  children: ReactNode;
}

// The entire card is a link. Children supply its number, category, or icon.
export function LinkCard({
  href,
  title,
  description,
  actionLabel,
  headingLevel: Heading = 'h3',
  children,
}: LinkCardProps) {
  return (
    <a className="path-card" href={href}>
      {children}
      <Heading>{title}</Heading>
      <p>{description}</p>
      <span className="card-cta">
        {actionLabel} <Arrow />
      </span>
    </a>
  );
}
