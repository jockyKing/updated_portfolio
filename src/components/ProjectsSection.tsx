import { useState } from 'react';
import {
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';

type FilterValue = 'all' | ProjectCategory;

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'excel', label: 'Excel' },
  { value: 'sql', label: 'SQL' },
  { value: 'dashboards', label: 'Dashboards' },
];

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const visibleProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.categories.includes(filter));

  return (
    <section id="projects" className="section-block">
      <div className="container">
        <div className="projects-header">
          <div className="section-heading">
            <span className="section-index">03.</span>
            <h2>Selected Projects</h2>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter projects by tool">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`filter-btn${filter === option.value ? ' active' : ''}`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid" id="projects-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-meta">
                <span>{project.number}</span>
                <span aria-hidden="true">·</span>
                <span>{project.metaCategory}</span>
                <span aria-hidden="true">·</span>
                <span>{project.domain}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-footer">
                <span className="project-tools">{project.tools}</span>
                <button
                  type="button"
                  className="project-link"
                  onClick={() => onSelectProject(project)}
                >
                  Read Case Study <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
