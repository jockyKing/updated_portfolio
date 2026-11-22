import { useState } from 'react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenCv: () => void;
}

export function Navbar({ onOpenCv }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          {PROFILE.brand}
          <span>.</span>
        </a>

        <div className="nav-right">
          <nav
            className={`nav-links${menuOpen ? ' active' : ''}`}
            id="nav-links"
            aria-label="Primary"
          >
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
            <a href="#certifications" onClick={closeMenu}>
              Certifications
            </a>
            <a href="#contact" className="nav-cta" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <button
            type="button"
            className="cv-print-btn"
            id="cv-print-btn"
            aria-label="Generate and print CV"
            title="Print / Save CV"
            onClick={onOpenCv}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
          </button>

          <button
            className="nav-toggle"
            id="nav-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
