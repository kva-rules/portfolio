import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, RotateCcw } from 'lucide-react';
import { PROFILE_DATA, ProjectItem, ProjectCategory } from '../../data/profile';
import { filterProjects, calculateCategoryCounts } from '../../utils/projectFilters';
import { FilterBar } from './FilterBar';
import { SearchBox } from './SearchBox';
import { ProjectCard } from './ProjectCard';
import { DemoModal } from './DemoModal';

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDemoProject, setActiveDemoProject] = useState<ProjectItem | null>(null);

  const { projects } = PROFILE_DATA;

  // Calculate live counts based on all projects
  const categoryCounts = useMemo(() => {
    return calculateCategoryCounts(projects);
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, activeCategory, searchQuery);
  }, [projects, activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="projects" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-1">
              System Implementations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Featured Projects
            </h2>
          </div>

          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Click any card or demo button to launch live interactive simulation
          </p>
        </div>

        {/* Filter and Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0E162E] border border-slate-200 dark:border-slate-800/80 shadow-xs mb-6">
          <FilterBar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={categoryCounts}
          />

          <SearchBox
            query={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Count Telemetry Header */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>
              Showing <strong className="text-cyan-300">{filteredProjects.length}</strong> of{' '}
              {projects.length} production architectures
            </span>
          </div>

          <span className="hidden sm:inline-block text-[11px] text-slate-500">
            Press Esc to exit live modal
          </span>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenDemo={(p) => setActiveDemoProject(p)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#131C38] border border-slate-800 space-y-4">
            <div className="inline-flex p-3 rounded-xl bg-slate-800 text-slate-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">
              No matching architectures found
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              No projects matched the search term &ldquo;{searchQuery}&rdquo; in the &ldquo;{activeCategory}&rdquo; category.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Interactive Modal */}
      {activeDemoProject && (
        <DemoModal
          project={activeDemoProject}
          onClose={() => setActiveDemoProject(null)}
        />
      )}
    </section>
  );
}
