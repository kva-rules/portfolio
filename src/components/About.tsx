import { ShieldCheck, Cpu, Layers } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function About() {
  const { about } = PROFILE_DATA;

  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            About &amp; Focus
          </h2>
        </div>

        {/* 2-Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Core Background */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                {about.title}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug mb-4">
                {about.headline}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {about.body}
              </p>
            </div>

            {/* Architectural Pillars Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {about.pills.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-[#1A2447] text-cyan-700 dark:text-cyan-300 border border-cyan-300/40 dark:border-cyan-400/20"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Active Assignment */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                  Active Assignment
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {about.currentAssignment.quarter}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug mb-2">
                {about.currentAssignment.role}
              </h3>

              <div className="inline-block px-3 py-1 rounded-md bg-cyan-50 dark:bg-[#1A2447] text-cyan-800 dark:text-cyan-300 font-mono text-xs font-semibold mb-4 border border-cyan-200 dark:border-cyan-500/20">
                {about.currentAssignment.project}
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                <span className="text-slate-400 dark:text-slate-500">Stack:</span> {about.currentAssignment.stack}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {about.currentAssignment.description}
              </p>
            </div>

            {/* SLA Uptime Telemetry Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                  {about.currentAssignment.metric.label}
                </div>
                <div className="text-lg font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {about.currentAssignment.metric.value}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-400/30 text-cyan-700 dark:text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
