import { PROFILE } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="section-block">
      <div className="container editorial-split">
        <div className="section-heading">
          <span className="section-index">01.</span>
          <h2>About Me</h2>
        </div>
        <div className="about-content">
          <p className="prose-lead">{PROFILE.aboutLead}</p>
          <p className="prose-body">{PROFILE.aboutBody}</p>
          <div className="about-facts">
            <div className="fact-item">
              <span className="fact-label">Institution</span>
              <span className="fact-value">{PROFILE.institution}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Discipline</span>
              <span className="fact-value">{PROFILE.discipline}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Location</span>
              <span className="fact-value">{PROFILE.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
