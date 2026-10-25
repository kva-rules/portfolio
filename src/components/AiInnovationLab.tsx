import { Box, Sparkles, Layers, ChevronRight, Activity } from 'lucide-react';

interface AiInnovationLabProps {
  onOpen3D: () => void;
}

export function AiInnovationLab({ onOpen3D }: AiInnovationLabProps) {
  const cards = [
    {
      id: '3d-scene',
      title: 'Three.js 3D Architecture Node',
      subtitle: 'Procedural 8-Part PBR Model with Studio Lighting',
      desc: 'Explore an interactive 3D procedural quantum microservice node and autonomous agent gimbal core with exploded view inspection, studio PBR materials, and 60fps damped kinematics.',
      icon: Box,
      badge: 'Three.js Studio PBR',
      badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-400/30',
      actionText: 'Launch 3D Visualizer',
      action: onOpen3D,
    },
  ];

  return (
    <section id="innovation-lab" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Interactive R&amp;D Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              3D Systems Lab
            </h2>
          </div>

          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-time WebGL rendering of a microservice architecture node
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="group p-6 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/60 dark:hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-[0_12px_32px_-8px_rgba(34,211,238,0.25)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1A2447] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 group-hover:border-cyan-400/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400/90 font-mono mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={card.action}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>{card.actionText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
