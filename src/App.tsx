import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { TextLink } from './components/Primitives';
import { PostRow } from './components/PostRow';
import { posts } from './content/posts';
import { profile } from './content/data';
import { legacyPostTarget, resolveRoute, type Route } from './lib/routes';
import { Home } from './pages/Home';
import { Academic } from './pages/Academic';
import { Developer } from './pages/Developer';
import { Blog, BlogPost } from './pages/Blog';
import { Teaching } from './pages/Teaching';

function Page({ route }: { route: Route }) {
  switch (route.kind) {
    case 'home':
      return <Home />;
    case 'academic':
      return <Academic />;
    case 'developer':
      return <Developer />;
    case 'blog':
      return <Blog />;
    case 'post':
      return route.post ? <BlogPost post={route.post} /> : null;
    case 'teaching':
      return <Teaching />;
    case 'redirect':
      return (
        <section className="container page-intro">
          <h1>This page has moved.</h1>
          <TextLink href={route.redirect ?? '/'} className="button button-primary">
            Continue to the new page
          </TextLink>
        </section>
      );
    case 'legacy-post':
      return (
        <section className="container page-intro">
          <h1>From the notebook.</h1>
          <p>Choose a post below if you are not redirected automatically.</p>
          {posts.map((post, index) => (
            <PostRow key={post.slug} post={post} index={index} />
          ))}
        </section>
      );
    case 'not-found':
      return (
        <section className="container page-intro">
          <p className="eyebrow">404 / A little off the map</p>
          <h1>
            A question without
            <br />
            <em>a page. Yet.</em>
          </h1>
          <p className="lead">
            This address doesn’t lead to a page. Head home to explore research, projects,
            and writing.
          </p>
          <TextLink href="/" className="button button-primary">
            Back to home
          </TextLink>
        </section>
      );
  }
}

export function App({ pathname }: { pathname: string }) {
  const route = resolveRoute(pathname);
  useEffect(() => {
    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', route.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', profile.origin + (route.redirect ?? route.path));
    if (route.kind === 'legacy-post') {
      const target = legacyPostTarget(window.location.search);
      if (target) window.location.replace(target);
    } else if (route.redirect) {
      window.location.replace(route.redirect);
    }
  }, [route]);
  return (
    <Layout active={route.active}>
      <Page route={route} />
    </Layout>
  );
}
