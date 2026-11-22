import { useEffect, useRef } from 'react';
import type { CertificationItem } from '../data/portfolioData';

interface CertModalProps {
  cert: { item: CertificationItem; imgUrl: string } | null;
  onClose: () => void;
}

export function CertModal({ cert, onClose }: CertModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!cert) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="modal-backdrop"
      id="cert-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-dialog cert-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        <div className="modal-top">
          <span className="modal-meta" id="cert-modal-meta">
            {cert.item.issuer} · {cert.item.year}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            className="modal-close"
            id="cert-modal-close"
            aria-label="Close certificate preview"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <h3 className="modal-title" id="cert-modal-title">
          {cert.item.title}
        </h3>
        <div className="cert-modal-frame">
          <img
            id="cert-modal-img"
            src={cert.imgUrl}
            alt={`${cert.item.title} certificate`}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
