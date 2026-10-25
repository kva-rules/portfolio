import { Cpu, Server, Layout, Cloud, Database, PieChart } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Skills() {
  const { skills, focusAllocation } = PROFILE_DATA;

  const groupIcons: Record<string, React.ReactNode> = {
    'ai-agents': <Cpu className="w-4 h-4 text-amber-400" />,
    'backend-distributed': <Server className="w-4 h-4 text-cyan-400" />,
    'frontend-engineering': <Layout className="w-4 h-4 text-blue-400" />,
    'cloud-devops': <Cloud className="w-4 h-4 text-sky-400" />,
    'data-persistence': <Database className="w-4 h-4 text-indigo-400" />,
  };

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-8">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Technical Arsenal · Skills &amp; Capabilities
          </h2>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skills.map((group) => (
            <div
              key={group.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#1A2447] border border-slate-200 dark:border-slate-700/60">
                    {groupIcons[group.id] || <Cpu className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {group.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {group.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-[#0B1020] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-cyan-400/40 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Focus Allocation Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/60 dark:hover:border-cyan-400/40 transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-none flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#1A2447] border border-slate-200 dark:border-slate-700/60">
                  <PieChart className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Focus Allocation
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Engineering Effort Distribution
                  </p>
                </div>
              </div>

              {/* Allocation Bars */}
              <div className="space-y-4 pt-4">
                {focusAllocation.map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#0B1020] overflow-hidden border border-slate-200 dark:border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Validated in high-throughput enterprise deployments
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
