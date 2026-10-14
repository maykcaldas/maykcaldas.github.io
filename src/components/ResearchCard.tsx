import type { Publication } from '../content/types';
import { TextLink } from './Primitives';

export function ResearchCard({ publication }: { publication: Publication }) {
  return (
    <article className="research-card">
      <a
        className="research-image"
        href={publication.url}
        aria-label={`Read ${publication.title}`}
      >
        <img
          src={publication.image}
          alt={`Graphical abstract for ${publication.title}`}
          loading="lazy"
          width={640}
          height={360}
        />
      </a>
      <p className="eyebrow">
        {publication.year} / {publication.venue}
      </p>
      <h3>
        <a href={publication.url}>{publication.title}</a>
      </h3>
      <TextLink href={publication.url}>Read the paper</TextLink>
    </article>
  );
}
