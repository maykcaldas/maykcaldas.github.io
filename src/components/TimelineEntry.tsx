import type { ReactNode } from 'react';

interface TimelineEntryProps {
  period: string;
  title: string;
  children: ReactNode;
}

// Education and talks share the same dated-row layout, but have different details.
export function TimelineEntry({ period, title, children }: TimelineEntryProps) {
  return (
    <article className="timeline-row">
      <span className="mono">{period}</span>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  );
}
