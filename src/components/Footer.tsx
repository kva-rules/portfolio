import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Footer() {
  const { personal } = PROFILE_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#070E22] py-8 text-xs font-mono text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright */}
          <div>
            &copy; 2026 {personal.name}. All rights reserved.
          </div>

          {/* Links & Back to top */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
