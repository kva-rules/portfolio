import { GitCommit, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function ExperienceTimeline() {
  const { experience } = PROFILE_DATA;

  return (
    <section id="experience" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-1">
              Career Trajectory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Professional Experience
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
            Cognizant Tech
          </span>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300 dark:border-slate-800/90 space-y-10">
          {experience.map((item, index) => {
            const isFirst = index === 0;

            return (
              <div key={item.id} className="relative group">
                
                {/* Node on vertical timeline */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isFirst
                      ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                      : 'bg-white dark:bg-[#09122B] border-slate-400 dark:border-slate-600 group-hover:border-cyan-500'
                  }`}
                />

                {/* Experience Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-lg">
                  
                  {/* Card Header: Role & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-2 mt-0.5">
                        <span>{item.company}</span>
                        <span>·</span>
                        <span className="text-slate-600 dark:text-slate-300 font-normal">Clients: {item.clients}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#1A2447] text-cyan-800 dark:text-cyan-300 text-xs font-mono font-medium border border-cyan-300/40 dark:border-cyan-400/20 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Highlight pill if present */}
                  {item.highlight && (
                    <div className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-300/40 dark:border-cyan-400/20 mb-3">
                      {item.highlight}
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bulleted key contributions */}
                  <ul className="space-y-2 mb-5">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-[#0B1020] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-400/40 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
