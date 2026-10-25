import { ProjectItem, ProjectCategory } from '../data/profile';

export interface FilterState {
  category: ProjectCategory;
  searchQuery: string;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string
): ProjectItem[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    // 1. Category matching
    let matchesCategory = true;
    if (category !== 'all') {
      matchesCategory = project.category === category;
    }

    if (!matchesCategory) return false;

    // 2. Search query matching across title, tags, and summary
    if (!query) return true;

    const inTitle = project.title.toLowerCase().includes(query);
    const inSubtitle = project.subtitle.toLowerCase().includes(query);
    const inSummary = project.summary.toLowerCase().includes(query);
    const inTags = project.tags.some((tag) => tag.toLowerCase().includes(query));

    return inTitle || inSubtitle || inSummary || inTags;
  });
}

export function calculateCategoryCounts(projects: ProjectItem[]): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    all: projects.length,
    'ai-agents': 0,
    'spring-boot': 0,
    react: 0,
  };

  projects.forEach((p) => {
    if (p.category in counts) {
      counts[p.category]++;
    }
  });

  return counts;
}
