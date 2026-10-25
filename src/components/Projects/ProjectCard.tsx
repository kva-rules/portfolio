import { Play, ExternalLink, Github, Sparkles, Terminal, Activity, Layers, Lock } from 'lucide-react';
import { ProjectItem } from '../../data/profile';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDemo: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpenDemo }: ProjectCardProps) {
  const isAgent = project.runnerType === 'ai-agent';

  const getStatusBadgeColor = (status: ProjectItem['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-amber-950/40 text-amber-300 border-amber-500/40';
      case 'Production Spec':
        return 'bg-cyan-950/40 text-cyan-300 border-cyan-500/40';
      case 'HIPAA Compliant':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#131C38] border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/60 dark:hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md dark:shadow-none dark:hover:shadow-[0_12px_32px_-8px_rgba(34,211,238,0.2)] flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner & Telemetry bar */}
      <div className="p-6 sm:p-7 space-y-4">
        
        {/* Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-[#1A2447] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {project.badge}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${getStatusBadgeColor(
              project.status
            )}`}
          >
            {project.status === 'In Progress' ? '● In Progress' : project.status}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400/90 font-mono mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Summary Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-[#0B1020] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800/90 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-[#0E162E] border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Demo trigger button */}
        {project.hasLiveDemo ? (
          <button
            type="button"
            onClick={() => onOpenDemo(project)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(34,211,238,0.3)] hover:shadow-[0_0_18px_rgba(34,211,238,0.5)] active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{project.demoButtonText}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onOpenDemo(project)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-[#1A2447] text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>View Architecture Spec</span>
          </button>
        )}

        {/* GitHub link button */}
        {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} on GitHub`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-[#1A2447] border border-slate-300 dark:border-slate-700/60 transition-colors cursor-pointer"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
        )}

      </div>
    </div>
  );
}
