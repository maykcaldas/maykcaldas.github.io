import { blogEnabled } from '../content/settings';
import { LinkCard } from '../components/LinkCard';
import { SectionHeading } from '../components/SectionHeading';
import { ResearchCard } from '../components/ResearchCard';
import { profile, publications } from '../content/data';
import { posts } from '../content/posts';
import { Arrow, SectionLabel, TextLink } from '../components/Primitives';
import { PostRow } from '../components/PostRow';
import { ContactIconLink } from '../components/ContactIconLink';

// Content for the three navigation cards below the introduction.
const paths = [
  {
    number: '01',
    name: 'Academic',
    title: 'Research & discovery',
    text: 'Publications, education, and ideas at the intersection of AI and chemistry.',
    href: '/academic/',
    cta: 'Read the research',
    symbol: '◎',
  },
  {
    number: '02',
    name: 'Developer',
    title: 'Tools & experiments',
    text: 'Scientific software, open-source projects, and things you can try.',
    href: '/developer/',
    cta: 'Explore the projects',
    symbol: '⌘',
  },
  {
    number: '03',
    name: 'Blog',
    title: 'Notes & questions',
    text: 'Writing about science, learning, and the things that catch my attention.',
    href: '/blog/',
    cta: 'Read the notebook',
    symbol: '↳',
  },
];

export function Home() {
  // Keep these two publications in the chosen display order.
  const selectedPublications = ['llm-review', 'mol-dev'].flatMap((id) =>
    publications.filter((publication) => publication.id === id),
  );

  return (
    <>
      {/* Introduction and portrait */}
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> When science meets software
          </p>
          <h1>
            Mayk
            <br />
            <span>Caldas</span>
            <span className="name-period">.</span>
          </h1>
          <p className="hero-disciplines">
            AI research <span>×</span> Chemistry <span>×</span> Software
          </p>
          <p className="hero-intro">
            I build tools to help us ask better questions
            <br className="desktop-break" /> and discover what comes next.
          </p>
          <p className="hero-role">
            Member of technical staff at{' '}
            <a href="https://www.futurehouse.org/">
              FutureHouse <Arrow />
            </a>
            <br />
            PhD in Chemical Sciences.
          </p>
          <div className="hero-links">
            <TextLink href="/academic/" className="button button-outline">
              Explore my research
            </TextLink>
            <TextLink href="/developer/" className="button button-outline">
              See what I build
            </TextLink>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <span className="art-plus plus-one" aria-hidden="true">
            +
          </span>
          <span className="art-plus plus-two" aria-hidden="true">
            +
          </span>
          <div className="portrait-frame">
            <img
              src="/media/images/MaykCaldas.jpg"
              alt="Portrait of Mayk Caldas"
              width={327}
              height={327}
              fetchPriority="high"
            />
            <span className="portrait-index mono">MC / 01</span>
          </div>
          <div className="portrait-note">
            <span className="mono">At the intersection of</span>
            <strong>molecules &amp; machines.</strong>
          </div>
          <span className="art-caption mono">A little science. A lot of curiosity.</span>
        </div>
      </section>
      <div className="discipline-strip">
        <div className="container mono">
          <span>Language models</span>
          <span aria-hidden="true">✳</span>
          <span>Molecular dynamics</span>
          <span aria-hidden="true">✳</span>
          <span>Scientific discovery</span>
          <span aria-hidden="true">✳</span>
          <span>Open-source software</span>
        </div>
      </div>
      {/* Biography */}
      <section className="about-section container" id="about">
        <SectionLabel number="01">A little about me</SectionLabel>
        <div className="section-split">
          <h2>
            Curiosity is the
            <br />
            common thread.
          </h2>
          <div className="about-copy">
            <p className="lead">
              My work lives where physical chemistry, machine learning, and software come
              together.
            </p>
            <p>
              I’m interested in how large language models and autonomous agents can help
              scientists solve complex problems. My background in molecular dynamics
              shapes how I approach molecular design, scientific tools, and the questions
              we ask of them.
            </p>
            <p>
              This is a place for my research, the things I build, and what I learn along
              the way.
            </p>
            <div className="inline-links">
              <TextLink href={profile.cv}>Download CV (PDF)</TextLink>
              <TextLink href={profile.scholar}>Google Scholar</TextLink>
            </div>
          </div>
        </div>
      </section>
      {/* Links to Academic, Developer, and Blog */}
      <section className="explore-section container" aria-labelledby="explore-title">
        <SectionHeading
          titleId="explore-title"
          title={blogEnabled ? 'Three ways in.' : 'Two ways in.'}
          actions={
            <>
              <span className="eyebrow">Choose your curiosity</span>
            </>
          }
        />
        <div className={`path-grid${blogEnabled ? '' : ' path-grid-two'}`}>
          {paths
            .filter((path) => blogEnabled || path.name !== 'Blog')
            .map((path) => (
              <LinkCard
                href={path.href}
                key={path.href}
                title={path.title}
                description={path.text}
                actionLabel={path.cta}
              >
                <div className="card-top mono">
                  <span>
                    {path.number} / {path.name}
                  </span>
                  <span className="card-symbol" aria-hidden="true">
                    {path.symbol}
                  </span>
                </div>
              </LinkCard>
            ))}
        </div>
      </section>
      {/* Featured publications */}
      <section className="selected-section container">
        <SectionLabel number="02">Selected research</SectionLabel>
        <SectionHeading
          title={
            <>
              Questions worth
              <br />
              working on.
            </>
          }
          actions={
            <>
              <TextLink href="/academic/#publications">All publications</TextLink>
            </>
          }
        />
        <div className="selected-grid">
          {selectedPublications.map((publication) => (
            <ResearchCard key={publication.id} publication={publication} />
          ))}
        </div>
      </section>
      {/* The two most recent blog posts */}
      {blogEnabled && (
        <section className="container writing-section">
          <SectionLabel number="03">From the notebook</SectionLabel>
          <SectionHeading
            title={<>Thinking out loud.</>}
            actions={
              <>
                <TextLink href="/blog/">All writing</TextLink>
              </>
            }
          />
          {posts.slice(0, 2).map((post, index) => (
            <PostRow key={post.slug} post={post} index={index} />
          ))}
        </section>
      )}
      {/* Contact and social profiles */}
      <section className="contact-section" id="contact">
        <div className="container">
          <p className="eyebrow">{blogEnabled ? '04' : '03'} / Start a conversation</p>
          <div className="contact-grid">
            <h2>
              Good ideas start
              <br />
              with a hello<span>.</span>
            </h2>
            <div>
              <p>
                Research, software, or a question you can’t stop thinking about. I’d love
                to hear it.
              </p>
              <TextLink href={`mailto:${profile.email}`} className="contact-email">
                {profile.email}
              </TextLink>
              <nav
                className="inline-links contact-social-links"
                aria-label="Social profiles"
              >
                <ContactIconLink href={profile.github} name="GitHub" icon="github" />
                <ContactIconLink
                  href={profile.scholar}
                  name="Google Scholar"
                  icon="googlescholar"
                />
                <ContactIconLink href="https://x.com/maykcaldas" name="X" icon="x" />
                <ContactIconLink
                  href="https://www.instagram.com/kyam888/"
                  name="Instagram"
                  icon="instagram"
                />
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
