import { useEffect, useRef } from 'react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      id="project-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-top">
          <span className="modal-meta" id="modal-meta">
            {project.caseStudy.meta}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            className="modal-close"
            id="modal-close"
            aria-label="Close case study"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <h3 className="modal-title" id="modal-title">
          {project.title}
        </h3>
        <p className="modal-summary" id="modal-summary">
          {project.caseStudy.summary}
        </p>

        <div className="modal-sections">
          <div className="modal-block">
            <h4>Business Question</h4>
            <p id="modal-question">{project.caseStudy.question}</p>
          </div>
          <div className="modal-block">
            <h4>Approach &amp; Tools</h4>
            <p id="modal-approach">{project.caseStudy.approach}</p>
          </div>
          <div className="modal-block">
            <h4>Key Findings</h4>
            <ul id="modal-findings">
              {project.caseStudy.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
