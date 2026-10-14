import { LinkCard } from '../components/LinkCard';
import { PageIntro, TextLink } from '../components/Primitives';

const resources = [
  [
    'Notebook',
    'Work through the hands-on exercises.',
    'https://colab.research.google.com/drive/1Oatq0W31Hwc6XBSWS9K5YQ9WgYJCidZc?usp=sharing',
  ],
  [
    'Code & datasets',
    'Explore the repository used in the talks.',
    'https://github.com/maykcaldas/AIMAT_KIT_2024',
  ],
  [
    'Presentation slides',
    'Follow the concepts and examples.',
    'https://docs.google.com/presentation/d/1KiAFnVLxe8Of6wHlZL5I8prry7Wdersl8TqAr3Dr4lU/edit?usp=sharing',
  ],
];

export function Teaching() {
  return (
    <>
      <PageIntro
        number="Teaching / 2024"
        label="CZS Summer School"
        heading={
          <>
            Machine learning
            <br />
            <em>meets chemistry.</em>
          </>
        }
        description="Materials from my talks on machine learning fundamentals, molecular property prediction, and large language models at the CZS 2024 Summer School."
        actions={<TextLink href="/academic/#talks">All talks &amp; teaching</TextLink>}
      />
      <section className="container teaching-content">
        <img
          className="teaching-banner"
          src="/media/images/CZS_summer_school_banner.png"
          alt="CZS Summer School 2024 — Machine Learning for Chemistry"
        />
        <p className="source-note">
          These are my teaching materials. Visit the{' '}
          <TextLink href="https://aimat.iti.kit.edu/ml4chem2024.php">
            official summer school website
          </TextLink>{' '}
          for event information.
        </p>
        <div className="resource-grid">
          {resources.map(([title, text, href], index) => (
            <LinkCard
              href={href}
              key={href}
              title={title}
              description={text}
              actionLabel="Open resource"
              headingLevel="h2"
            >
              <span className="mono">{String(index + 1).padStart(2, '0')}</span>
            </LinkCard>
          ))}
        </div>
        <div className="prose teaching-prose">
          <h2>Machine learning fundamentals</h2>
          <p>
            An introduction to the concepts behind a machine learning project: the steps
            involved, common problems, and a toy example to connect the ideas. The aim is
            to provide a starting point for exploring the mathematics, statistics, and
            programming in more depth.
          </p>
          <h2>Machine learning for molecular property predictions</h2>
          <p>
            What changes when a machine learning problem is a chemistry problem? This
            session connects the fundamentals to real-world chemical applications,
            followed by a hands-on exercise using a provided dataset.
          </p>
          <h2>Large language models in chemistry</h2>
          <p>
            Exploring how LLMs can support property prediction, scientific reasoning,
            hypothesis creation, data curation, and laboratory automation. For further
            reading, see our{' '}
            <a href="https://doi.org/10.1039/D4SC03921A">
              review of large language models and autonomous agents in chemistry
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
