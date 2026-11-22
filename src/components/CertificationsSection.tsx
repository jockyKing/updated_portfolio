import { useState } from 'react';
import {
  CERTIFICATIONS,
  getCertImageUrl,
  type CertificationItem,
} from '../data/portfolioData';

interface CertificationsSectionProps {
  onSelectCert: (cert: CertificationItem, resolvedImgUrl: string) => void;
}

export function CertificationsSection({
  onSelectCert,
}: CertificationsSectionProps) {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const markImageBroken = (id: string) => {
    setBrokenImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  return (
    <section id="certifications" className="section-block">
      <div className="container">
        <div className="section-header-row">
          <div className="section-heading">
            <span className="section-index">04.</span>
            <h2>Certifications</h2>
          </div>
          <p className="section-subnote">
            Coursework and credentials in data analytics and visualization.
          </p>
        </div>

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert) => {
            const imgUrl = cert.imageFile ? getCertImageUrl(cert.imageFile) : '';
            const showMedia = Boolean(imgUrl) && !brokenImages[cert.id];

            return (
              <article className="cert-card" key={cert.id}>
                {showMedia && (
                  <div className="cert-media">
                    <img
                      src={imgUrl}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => markImageBroken(cert.id)}
                    />
                  </div>
                )}

                <div className="cert-meta">
                  <span>{cert.issuer}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cert.year}</span>
                </div>
                <h3>{cert.title}</h3>
                <p>{cert.description}</p>
                <div className="cert-footer">
                  <span className="cert-id">{cert.credentialId}</span>
                  {showMedia && (
                    <button
                      type="button"
                      className="cert-view-btn"
                      onClick={() => onSelectCert(cert, imgUrl)}
                    >
                      View Certificate <span aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
