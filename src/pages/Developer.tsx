import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { Toolkit, type ToolGroup } from '../components/Toolkit';
import { profile, projects } from '../content/data';
import { FilterList } from '../components/FilterList';
import { PageIntro, SectionLabel, TextLink } from '../components/Primitives';

const toolkit: ToolGroup[] = [
  { title: 'Languages', tools: ['Python', 'Bash', 'JavaScript', 'C / C++', 'Fortran'] },
  {
    title: 'Machine learning',
    tools: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face'],
  },
  { title: 'Molecular simulation', tools: ['GROMACS', 'LAMMPS', 'VMD', 'PyMOL'] },
  {
    title: 'Working together',
    tools: ['Git', 'GitHub', 'Linux', 'Scientific communication'],
  },
];

export function Developer() {
  return (
    <>
      <PageIntro
        number="02"
        label="Developer"
        heading={
          <>
            Ideas are better
            <br />
            <em>when you can try them.</em>
          </>
        }
        description="Software for scientific questions. A collection of research tools, open-source projects, and experiments in making things useful."
        actions={
          <>
            <TextLink href={profile.github}>Find me on GitHub</TextLink>
            <TextLink href={profile.cv}>Download CV (PDF)</TextLink>
          </>
        }
      />
      <section className="container featured-project" id="mol-dev">
        <div className="featured-project-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Try it online / Featured project
          </p>
          <h2>
            Small molecules.
            <br />
            Right in your browser.
          </h2>
          <p>
            mol.dev brings deep-learning solubility predictions to endpoint devices.
            Explore the live application and the research behind it.
          </p>
          <div className="inline-links">
            <TextLink href="https://mol.dev/" className="button button-primary">
              Open mol.dev
            </TextLink>
            <TextLink href="https://github.com/ur-whitelab/mol.dev">View source</TextLink>
          </div>
          <p className="small-note">The live app opens at mol.dev.</p>
        </div>
        <div className="featured-project-image">
          <img
            src="/media/images/toc5.png"
            alt="Overview of mol.dev molecular solubility predictions"
            width={640}
            height={360}
          />
        </div>
      </section>
      <section className="container content-section">
        <SectionLabel number="01">Selected projects</SectionLabel>
        <SectionHeading
          title={<>Built around a question.</>}
          actions={
            <>
              <span className="eyebrow">Code you can explore</span>
            </>
          }
        />
        <FilterList
          items={projects}
          label="projects"
          categories={['Machine learning', 'Molecular simulation', 'Research resources']}
          placeholder="Project, technology, or topic…"
          className="project-grid"
          getKey={(project) => project.id}
          getCategory={(project) => project.category}
          getSearch={(project) =>
            [project.name, project.description, ...project.tags].join(' ')
          }
          renderItem={(project, index, hidden) => (
            <ProjectCard project={project} index={index} hidden={hidden} />
          )}
          emptyMessage="No projects match your search. Try another term or choose all topics."
        />
      </section>
      <section className="container skills-section" id="toolkit">
        <SectionLabel number="02">My toolkit</SectionLabel>
        <div className="section-split">
          <h2>
            A mix of science
            <br />
            and engineering.
          </h2>
          <Toolkit groups={toolkit} />
        </div>
      </section>
    </>
  );
}
