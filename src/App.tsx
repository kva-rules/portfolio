import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/Projects';
import { AiInnovationLab } from './components/AiInnovationLab';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
const ArchitectureNodeScene = lazy(() =>
  import('./components/ThreeScene/ArchitectureNodeScene').then((m) => ({ default: m.ArchitectureNodeScene }))
);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'innovation-lab', 'skills', 'certifications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Esc listener for 3D Viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && is3DModalOpen) {
        setIs3DModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [is3DModalOpen]);

  return (
    <div id="top" className="min-h-screen bg-slate-50 dark:bg-[#09122B] text-slate-900 dark:text-slate-100 bg-grid-pattern transition-colors duration-300 pb-28 lg:pb-0 selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-200">
      {/* Global Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <Stats />
        <About />
        <ExperienceTimeline />
        <ProjectsSection />
        <AiInnovationLab
          onOpen3D={() => setIs3DModalOpen(true)}
        />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Navigation */}
      <MobileBottomNav activeSection={activeSection} />

      {/* 3D Viewport Fullscreen Overlay Modal */}
      {is3DModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="3D Architecture Visualizer"
          className="fixed inset-0 z-50 bg-[#040D26]/95 backdrop-blur-md flex flex-col"
        >
          <Suspense fallback={<div className="m-auto text-cyan-400 font-mono text-sm">Loading 3D scene…</div>}>
            <ArchitectureNodeScene
              isFullBleed={true}
              onClose={() => setIs3DModalOpen(false)}
            />
          </Suspense>
        </div>
      )}

    </div>
  );
}

