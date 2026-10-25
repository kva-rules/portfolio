import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Education() {
  const { education } = PROFILE_DATA;

  return (
    <section id="education" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Academic Foundation · Education
          </h2>
        </div>

        {/* 2-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 transition-all duration-300 hover:shadow-md shadow-xs dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    {item.institution}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#1A2447] text-cyan-800 dark:text-cyan-300 border border-cyan-300/40 dark:border-cyan-400/20">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {item.degree}
                </h3>

                {item.score && (
                  <div className="inline-block px-3 py-1 rounded bg-cyan-50 dark:bg-[#0B1020] text-cyan-800 dark:text-cyan-400 font-mono text-xs font-semibold mb-3 border border-cyan-200 dark:border-slate-800">
                    {item.score}
                  </div>
                )}

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.details}
                </p>
              </div>

              {item.thesis && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-300">
                  <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{item.thesis}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
