import type { Post } from '../content/types';
import { Arrow, Tags } from './Primitives';

export const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export function PostRow({
  post,
  index,
  hidden = false,
}: {
  post: Post;
  index: number;
  hidden?: boolean;
}) {
  return (
    <article className="writing-row filter-item" hidden={hidden}>
      <span className="mono writing-number">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <p className="eyebrow">
          {post.category} <span className="dot-separator">/</span>{' '}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3>
          <a href={`/blog/${post.slug}/`}>{post.title}</a>
        </h3>
        <p>{post.excerpt}</p>
        <Tags items={post.tags} />
      </div>
      <a
        className="round-link"
        href={`/blog/${post.slug}/`}
        aria-label={`Read ${post.title}`}
      >
        <Arrow />
      </a>
    </article>
  );
}
