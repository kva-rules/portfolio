import { Briefcase, GraduationCap, Award, Building2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Stats() {
  const { stats } = PROFILE_DATA;

  const statIcons: Record<string, React.ReactNode> = {
    tenure: <Briefcase className="w-5 h-5 text-cyan-400" />,
    degree: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    certifications: <Award className="w-5 h-5 text-cyan-400" />,
    clients: <Building2 className="w-5 h-5 text-cyan-400" />,
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-[0_12px_24px_-8px_rgba(34,211,238,0.2)]"
            >
              {/* Category label & icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  {item.category}
                </span>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#1A2447] border border-slate-200 dark:border-slate-700/50 group-hover:border-cyan-400/50 transition-colors">
                  {statIcons[item.id] || <Award className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                </div>
              </div>

              {/* Stat Value */}
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {item.value}
              </div>

              {/* Label & Sublabel */}
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {item.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {item.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
