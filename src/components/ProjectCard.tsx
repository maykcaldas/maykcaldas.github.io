import type { Project } from '../content/types';
import { Tags, TextLink } from './Primitives';

export function ProjectCard({
  project,
  index,
  hidden,
}: {
  project: Project;
  index: number;
  hidden: boolean;
}) {
  return (
    <article
      className="project-card filter-item"
      id={project.id === 'mol-dev' ? undefined : project.id}
      hidden={hidden}
    >
      <div className="project-image">
        <img
          src={project.image}
          alt={`${project.name} project overview`}
          loading="lazy"
          width={640}
          height={360}
        />
        <span className="image-index mono">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-body">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-kicker">{project.kicker}</p>
        <p>{project.description}</p>
        <Tags items={project.tags} />
        <div className="inline-links">
          <TextLink href={project.repo}>Source code</TextLink>
          {project.paper && (
            <TextLink href={`/academic/#${project.paper}`}>Paper</TextLink>
          )}
          {project.demo && (
            <TextLink href={project.demo}>{project.demoLabel || 'Live app'}</TextLink>
          )}
        </div>
      </div>
    </article>
  );
}
