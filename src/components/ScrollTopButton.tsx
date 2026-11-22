import { useEffect, useState } from 'react';

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`scroll-top-btn${visible ? ' is-visible' : ''}`}
      id="scroll-top-btn"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
