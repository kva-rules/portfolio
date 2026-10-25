import { Home, Cpu, Layers, Briefcase, Mail, Download } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

interface MobileBottomNavProps {
  activeSection: string;
}

export function MobileBottomNav({ activeSection }: MobileBottomNavProps) {
  const { personal } = PROFILE_DATA;

  const navItems = [
    { id: 'hero', label: 'Overview', icon: Home, href: '#top' },
    { id: 'about', label: 'About', icon: Cpu, href: '#about' },
    { id: 'projects', label: 'Projects', icon: Layers, href: '#projects' },
    { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden flex flex-col pointer-events-none">
      {/* Sticky Download Resume bar right above bottom nav */}
      <div className="px-4 pb-2 pt-1 pointer-events-auto flex justify-center">
        <a
          href={personal.resumeUrl}
          download="Abhidhab_Mellwyn_Resume.pdf"
          className="w-full max-w-sm flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-400 text-slate-950 shadow-[0_4px_20px_rgba(34,211,238,0.4)] active:scale-95 transition-transform"
        >
          <Download className="w-4 h-4" />
          <span>Download Resume</span>
        </a>
      </div>

      {/* Quick Nav Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="pointer-events-auto bg-white/95 dark:bg-[#09122B]/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-around shadow-2xl transition-colors"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-mono mt-0.5">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
