import { posts } from '../content/posts';
import type { Post } from '../content/types';
import { FilterList } from '../components/FilterList';
import { PageIntro, Tags, TextLink } from '../components/Primitives';
import { formatDate, PostRow } from '../components/PostRow';

export function Blog() {
  return (
    <>
      <PageIntro
        number="03"
        label="The notebook"
        heading={
          <>
            Thinking out loud.
            <br />
            <em>Learning along the way.</em>
          </>
        }
        description="A place for ideas in progress, notes on science, and the small things I learn by making things."
        actions={<TextLink href="/feed.xml">Subscribe via RSS</TextLink>}
      />
      <section className="container blog-list content-section">
        <FilterList
          items={posts}
          label="posts"
          categories={[...new Set(posts.map((post) => post.category))]}
          placeholder="Search titles, topics, or tags…"
          getKey={(post) => post.slug}
          getCategory={(post) => post.category}
          getSearch={(post) => [post.title, post.excerpt, ...post.tags].join(' ')}
          renderItem={(post, index, hidden) => (
            <PostRow post={post} index={index} hidden={hidden} />
          )}
          emptyMessage="No posts match your search. Try another term or choose all topics."
        />
      </section>
    </>
  );
}

export function BlogPost({ post }: { post: Post }) {
  return (
    <article className="article-container">
      <header className="article-header">
        <TextLink href="/blog/">Back to the notebook</TextLink>
        <p className="eyebrow">
          {post.category} / <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1>{post.title}</h1>
        <Tags items={post.tags} />
      </header>
      {/* This is the only HTML boundary: Markdown is sanitized during content generation. */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <footer className="article-footer">
        <p>Written by Mayk Caldas.</p>
        <TextLink href="/blog/">More from the notebook</TextLink>
      </footer>
    </article>
  );
}
