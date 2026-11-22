import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolioData';

export function ContactSection() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'fallback'>(
    'idle',
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopyStatus('copied');
      timerRef.current = window.setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);
    } catch {
      setCopyStatus('fallback');
    }
  };

  const copyLabel =
    copyStatus === 'copied'
      ? 'Copied'
      : copyStatus === 'fallback'
        ? 'Select email'
        : 'Copy';

  return (
    <section id="contact" className="section-block section-contact">
      <div className="container editorial-split">
        <div className="section-heading">
          <span className="section-index">05.</span>
          <h2>Contact</h2>
        </div>

        <div className="contact-content">
          <p className="prose-lead">
            Open to entry-level data analyst roles, internships, and collaborative
            data projects.
          </p>

          <div className="contact-rows">
            <div className="contact-row">
              <span className="contact-label">Email</span>
              <div className="contact-value-group">
                <a href={`mailto:${PROFILE.email}`} className="contact-link">
                  {PROFILE.email}
                </a>
                <button
                  type="button"
                  className={`copy-btn${copyStatus === 'copied' ? ' copied' : ''}`}
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                >
                  {copyLabel}
                </button>
              </div>
            </div>

            <div className="contact-row">
              <span className="contact-label">GitHub</span>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {PROFILE.githubDisplay} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-label">LinkedIn</span>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {PROFILE.linkedinDisplay} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
