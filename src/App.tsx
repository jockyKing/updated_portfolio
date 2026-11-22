import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CertModal } from './components/CertModal';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { CvModal } from './components/CvModal';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ScrollTopButton } from './components/ScrollTopButton';
import { SkillsSection } from './components/SkillsSection';
import { PROFILE, type CertificationItem, type ProjectItem } from './data/portfolioData';

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<{
    item: CertificationItem;
    imgUrl: string;
  } | null>(null);

  const anyModalOpen = Boolean(activeProject || cvOpen || activeCert);

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [anyModalOpen]);

  return (
    <>
      <BackgroundCanvas />
      <Navbar onOpenCv={() => setCvOpen(true)} />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onSelectProject={setActiveProject} />
        <CertificationsSection
          onSelectCert={(item, imgUrl) => setActiveCert({ item, imgUrl })}
        />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>&copy; {PROFILE.year} {PROFILE.brand}. Data Analytics Portfolio.</p>
        </div>
      </footer>

      <ScrollTopButton />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
}
