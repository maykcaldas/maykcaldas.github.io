import { TimelineEntry } from '../components/TimelineEntry';
import { SectionHeading } from '../components/SectionHeading';
import { PublicationRow } from '../components/PublicationRow';
import { profile, publications, education, talks } from '../content/data';
import { FilterList } from '../components/FilterList';
import { PageIntro, SectionLabel, TextLink } from '../components/Primitives';

export function Academic() {
  return (
    <>
      <PageIntro
        number="01"
        label="Academic"
        heading={
          <>
            Science, with
            <br />
            <em>new possibilities.</em>
          </>
        }
        description="Exploring how computational tools help us understand molecules, design experiments, and accelerate scientific discovery."
        actions={
          <>
            <TextLink href={profile.cv}>Download CV (PDF)</TextLink>
            <TextLink href={profile.scholar}>Google Scholar</TextLink>
          </>
        }
      />
      <nav className="section-nav container" aria-label="Academic sections">
        <a href="#publications">Publications</a>
        <a href="#research">Research projects</a>
        <a href="#education">Education</a>
        <a href="#talks">Talks &amp; teaching</a>
      </nav>
      <section className="container content-section" id="publications">
        <SectionLabel number="01">Publications &amp; research writing</SectionLabel>
        <SectionHeading
          title={<>From the research.</>}
          actions={
            <>
              <span className="eyebrow">2019—2026</span>
            </>
          }
        />
        <FilterList
          items={publications}
          label="publications"
          categories={['AI for science', 'Machine learning', 'Molecular science']}
          placeholder="Title, author, year, or topic…"
          className="publication-list"
          getKey={(publication) => publication.id}
          getCategory={(publication) => publication.topic}
          getSearch={(publication) =>
            [
              publication.title,
              publication.authors,
              publication.venue,
              publication.year,
              publication.topic,
            ].join(' ')
          }
          renderItem={(publication, _index, hidden) => (
            <PublicationRow publication={publication} hidden={hidden} />
          )}
          emptyMessage="No publications match your search. Try another term or choose all topics."
        />
      </section>
      <section className="container content-section" id="research">
        <SectionLabel number="02">Research in practice</SectionLabel>
        <SectionHeading
          title={<>From papers to tools.</>}
          actions={
            <>
              <TextLink href="/developer/">Explore the software</TextLink>
            </>
          }
        />
        <div className="research-directions">
          <article>
            <span className="mono">01</span>
            <h3>AI for scientific discovery</h3>
            <p>Language models, autonomous agents, and scientific reasoning.</p>
            <TextLink href="/academic/#llm-review">LLMs &amp; agents review</TextLink>
          </article>
          <article>
            <span className="mono">02</span>
            <h3>Learning molecular properties</h3>
            <p>Machine learning for prediction and the design of experiments.</p>
            <TextLink href="/developer/#mol-dev">Explore mol.dev</TextLink>
          </article>
          <article>
            <span className="mono">03</span>
            <h3>Molecular modeling</h3>
            <p>Simulation tools and studies of complex molecular systems.</p>
            <TextLink href="/developer/#pypolybuilder">Explore pyPolyBuilder</TextLink>
          </article>
        </div>
      </section>
      <section className="container content-section" id="education">
        <SectionLabel number="03">Education</SectionLabel>
        <h2>
          A foundation in
          <br />
          science &amp; computing.
        </h2>
        <div className="timeline">
          {education.map(([years, degree, school, thesis]) => (
            <TimelineEntry key={degree} period={years} title={degree}>
              <p className="institution">{school}</p>
              <p>{thesis}</p>
            </TimelineEntry>
          ))}
        </div>
      </section>
      <section className="container content-section" id="talks">
        <SectionLabel number="04">Talks &amp; teaching</SectionLabel>
        <h2>Sharing what I learn.</h2>
        <div className="timeline">
          {talks.map(([year, event, title, href]) => (
            <TimelineEntry key={`${year}-${event}`} period={year} title={event}>
              <p>{title}</p>
              {href && <TextLink href={href}>Notebooks, slides &amp; materials</TextLink>}
            </TimelineEntry>
          ))}
        </div>
      </section>
    </>
  );
}
