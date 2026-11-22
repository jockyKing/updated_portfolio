import { SKILL_GROUPS } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="section-block">
      <div className="container">
        <div className="section-header-row">
          <div className="section-heading">
            <span className="section-index">02.</span>
            <h2>Skills &amp; Tools</h2>
          </div>
          <p className="section-subnote">
            Organized across data preparation, querying, and visual storytelling.
          </p>
        </div>

        <div className="skills-columns">
          {SKILL_GROUPS.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-detail">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
