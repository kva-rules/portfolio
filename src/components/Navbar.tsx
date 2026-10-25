import { useState } from 'react';
import { Terminal, Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PROFILE_DATA } from '../data/profile';

interface NavbarProps {
  activeSection?: string;
}

export function Navbar({ activeSection = 'hero' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personal } = PROFILE_DATA;

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects', hasBadge: true },
    { label: 'AI Lab', href: '#innovation-lab', id: 'innovation-lab' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#09122B]/90 backdrop-blur-md transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-blue-600/20 border border-cyan-500/30 dark:border-cyan-400/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all">
            <Terminal className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              {personal.name}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              AI &amp; FULL STACK
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSection === link.id
                  ? 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              {link.label}
              {link.hasBadge && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              )}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <a
            href={personal.resumeUrl}
            download="Abhidhab_Mellwyn_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_14px_rgba(34,211,238,0.35)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#09122B]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2.5 text-base font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </div>
            </a>
          ))}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <a
              href={personal.resumeUrl}
              download="Abhidhab_Mellwyn_Resume.pdf"
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
