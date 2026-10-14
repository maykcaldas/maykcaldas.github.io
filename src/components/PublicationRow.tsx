import type { Publication } from '../content/types';
import { TextLink } from './Primitives';

export function PublicationRow({
  publication,
  hidden,
}: {
  publication: Publication;
  hidden: boolean;
}) {
  return (
    <article
      className={`publication filter-item${publication.image ? ' publication-with-image' : ''}`}
      id={publication.id}
      hidden={hidden}
    >
      <span className="publication-year mono">{publication.year}</span>
      {publication.image && (
        <figure className="publication-visual">
          <a
            className="publication-image"
            href={publication.url}
            aria-label={`View paper: ${publication.title}`}
          >
            <img
              src={publication.image}
              alt={publication.imageAlt ?? `Graphical abstract for ${publication.title}`}
              loading="lazy"
              decoding="async"
            />
          </a>
        </figure>
      )}
      <div className="publication-copy">
        <p className="eyebrow">
          {publication.venue} <span className="dot-separator">/</span> {publication.type}
        </p>
        <h3>
          <a href={publication.url}>{publication.title}</a>
        </h3>
        <p className="authors">{publication.authors}</p>
        <div className="inline-links">
          <TextLink href={publication.url}>
            {publication.type === 'Research announcement'
              ? 'Read announcement'
              : 'Read paper'}
          </TextLink>
          {publication.code && <TextLink href={publication.code}>Code</TextLink>}
          {publication.demo && <TextLink href={publication.demo}>Live app</TextLink>}
        </div>
      </div>
    </article>
  );
}
