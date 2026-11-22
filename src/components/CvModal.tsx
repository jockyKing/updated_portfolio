import { useEffect, useRef } from 'react';
import {
  CERTIFICATIONS,
  PROFILE,
  PROJECTS,
} from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const printBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    printBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop cv-modal-backdrop"
      id="cv-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="cv-modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-heading"
      >
        <div className="cv-modal-toolbar">
          <span className="cv-modal-label" id="cv-modal-heading">
            Curriculum Vitae Preview
          </span>
          <div className="cv-modal-actions">
            <button
              ref={printBtnRef}
              type="button"
              className="cv-action-print"
              id="cv-trigger-print"
              onClick={() => window.print()}
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              className="modal-close"
              id="cv-modal-close"
              aria-label="Close CV preview"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <article className="cv-sheet" id="cv-sheet">
          <header className="cv-header">
            <div>
              <h2 className="cv-name">{PROFILE.brand}</h2>
              <p className="cv-role">{PROFILE.cvRole}</p>
            </div>
            <div className="cv-contact-list">
              <span>{PROFILE.email}</span>
              <span>{PROFILE.githubDisplay}</span>
              <span>{PROFILE.linkedinDisplay}</span>
              <span>{PROFILE.location}</span>
            </div>
          </header>

          <section className="cv-section">
            <h3>Profile</h3>
            <p>{PROFILE.cvProfile}</p>
          </section>

          <section className="cv-section">
            <h3>Education</h3>
            <div className="cv-entry">
              <div className="cv-entry-row">
                <strong>{PROFILE.institution}</strong>
                <span>{PROFILE.location}</span>
              </div>
              <p className="cv-entry-sub">{PROFILE.discipline} (Student)</p>
            </div>
          </section>

          <section className="cv-section">
            <h3>Skills &amp; Tools</h3>
            <div className="cv-skills-grid">
              <div>
                <strong>Querying &amp; Spreadsheets:</strong>{' '}
                <span>
                  SQL (joins, aggregations, cohort queries), Excel (Pivot Tables,
                  lookups, KPI modeling), Google Sheets
                </span>
              </div>
              <div>
                <strong>BI &amp; Visualization:</strong>{' '}
                <span>
                  Power BI, Tableau, Data Visualization, Plain-Language Reporting
                </span>
              </div>
              <div>
                <strong>Workflow &amp; Growth:</strong>{' '}
                <span>
                  Data Cleaning (deduplication, formatting, validation), Python
                  (learning)
                </span>
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h3>Selected Analytics Projects</h3>
            {PROJECTS.map((project) => (
              <div className="cv-entry" key={project.id}>
                <div className="cv-entry-row">
                  <strong>{project.title}</strong>
                  <span>{project.cvSubtitle}</span>
                </div>
                <p>{project.cvDescription}</p>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <h3>Certifications</h3>
            {CERTIFICATIONS.map((cert) => (
              <div className="cv-entry" key={cert.id}>
                <div className="cv-entry-row">
                  <strong>{cert.cvTitle}</strong>
                  <span>
                    {cert.issuer.replace(' · Placeholder', '')} · {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}
