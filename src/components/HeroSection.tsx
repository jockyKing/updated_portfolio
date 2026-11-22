import { PROFILE } from '../data/portfolioData';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{PROFILE.eyebrow}</p>
          <h1>{PROFILE.headline}</h1>
          <p className="hero-lead">{PROFILE.lead}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Selected Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>

        <aside className="hero-ledger" aria-label="Analyst overview">
          <div className="ledger-header">
            <span className="ledger-label">Profile Summary</span>
            <span className="ledger-year">{PROFILE.year}</span>
          </div>

          <div className="ledger-chart" aria-hidden="true">
            <svg viewBox="0 0 320 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line
                className="chart-grid-line"
                x1="0"
                y1="24"
                x2="320"
                y2="24"
                strokeDasharray="3 3"
              />
              <line
                className="chart-grid-line"
                x1="0"
                y1="54"
                x2="320"
                y2="54"
                strokeDasharray="3 3"
              />
              <line className="chart-grid-line" x1="0" y1="84" x2="320" y2="84" />
              <path
                className="chart-line"
                d="M8 76 C 48 72, 64 52, 98 56 C 132 60, 148 34, 186 38 C 224 42, 248 18, 312 12"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle className="chart-node" cx="98" cy="56" r="3.5" strokeWidth="2" />
              <circle className="chart-node" cx="186" cy="38" r="3.5" strokeWidth="2" />
              <circle className="chart-node-end" cx="312" cy="12" r="4" />
            </svg>
          </div>

          <dl className="ledger-rows">
            {PROFILE.ledgerRows.map((row) => (
              <div className="ledger-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
