import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: ReactNode;
  titleId?: string;
  actions?: ReactNode;
}

// A heading with an optional link or short label aligned alongside it.
export function SectionHeading({ title, titleId, actions }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 id={titleId}>{title}</h2>
      {actions}
    </div>
  );
}
