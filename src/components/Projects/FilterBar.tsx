import { ProjectCategory } from '../../data/profile';

interface FilterBarProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  counts: Record<ProjectCategory, number>;
}

export function FilterBar({ activeCategory, onSelectCategory, counts }: FilterBarProps) {
  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-agents', label: 'AI & Agents' },
    { id: 'spring-boot', label: 'Spring Boot' },
    { id: 'react', label: 'React' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer ${
              isActive
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'bg-slate-100 dark:bg-[#131C38] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:border-cyan-400/40 hover:text-cyan-600 dark:hover:text-cyan-300'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                isActive
                  ? 'bg-slate-950/20 text-slate-950 font-bold'
                  : 'bg-slate-200 dark:bg-[#1A2447] text-cyan-800 dark:text-cyan-300'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
