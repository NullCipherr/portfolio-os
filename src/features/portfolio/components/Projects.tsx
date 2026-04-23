/**
 * features/portfolio/components/Projects.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { ExternalLink, Github, LayoutGrid, List, Star, FolderGit2 } from 'lucide-react';
import { usePortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { cn } from '@/shared/lib/utils';
import { AppId } from '@/shared/types';
import { navigatePortfolioBrowser } from '@/shared/lib/browserNavigation';

type ProjectsPanel = 'favorites' | 'repositories';

interface ProjectsProps {
  openWindow: (id: AppId) => void;
}

export function Projects({ openWindow }: ProjectsProps) {
  const { locale } = useSettings();
  const projectsContent = usePortfolioContent(locale).projects;
  const [activePanel, setActivePanel] = React.useState<ProjectsPanel>('favorites');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const [gridColumns, setGridColumns] = React.useState<1 | 2 | 3>(1);

  const openInInternalBrowser = (url?: string) => {
    if (!url) return;
    navigatePortfolioBrowser(url);
    openWindow('browser');
  };

  React.useEffect(() => {
    if (viewMode !== 'grid' || activePanel !== 'repositories') return;

    const container = gridContainerRef.current;
    if (!container) return;

    const updateColumns = () => {
      const width = container.clientWidth;
      if (width >= 1180) {
        setGridColumns(3);
      } else if (width >= 760) {
        setGridColumns(2);
      } else {
        setGridColumns(1);
      }
    };

    updateColumns();

    const observer = new ResizeObserver(updateColumns);
    observer.observe(container);

    return () => observer.disconnect();
  }, [viewMode, activePanel]);

  return (
    <div className="h-full flex flex-col md:flex-row bg-transparent">
      <aside className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200/70 dark:border-gray-700/50 p-4 bg-black/5 dark:bg-white/5">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Projects View</h2>
        <nav className="flex md:flex-col gap-2">
          <button
            onClick={() => setActivePanel('favorites')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              activePanel === 'favorites'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            )}
          >
            <Star className="w-4 h-4" />
            <span>{projectsContent.sidebar.favorites}</span>
          </button>
          <button
            onClick={() => setActivePanel('repositories')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              activePanel === 'repositories'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            )}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>{projectsContent.sidebar.repositories}</span>
          </button>
        </nav>
      </aside>

      <div className="flex-1 p-6 overflow-y-auto">
        {activePanel === 'favorites' ? (
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{projectsContent.favoritesTitle}</h3>
            <div className="space-y-4">
              {projectsContent.favorites.map((project, index) => (
                <article
                  key={project.id}
                  className="bg-white dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                        {`#${index + 1}`}
                      </p>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h4>
                    </div>
                    {project.repositoryUrl ? (
                      <button
                        onClick={() => openInInternalBrowser(project.repositoryUrl)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={`Open repository for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </button>
                    ) : null}
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.summary}</p>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Highlights</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((stackItem) => (
                      <span key={stackItem} className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                        {stackItem}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{projectsContent.repositoriesTitle}</h3>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div
                ref={gridContainerRef}
                className="grid gap-6"
                style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
              >
                {projectsContent.items.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-3">
                          <button
                            onClick={() => openInInternalBrowser(project.liveUrl || project.repositoryUrl)}
                            aria-label={`Open project ${project.title}`}
                            className="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openInInternalBrowser(project.repositoryUrl)}
                            aria-label={`Open repository for ${project.title}`}
                            className="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform"
                          >
                            <Github className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <button
                        onClick={() => openInInternalBrowser(project.repositoryUrl || project.liveUrl)}
                        className="text-left text-lg font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors"
                      >
                        {project.title}
                      </button>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {projectsContent.items.map((project) => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-28 h-20 object-cover rounded-lg hidden sm:block"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-base font-bold text-gray-900 truncate">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => openInInternalBrowser(project.liveUrl || project.repositoryUrl)}
                            aria-label={`Open project ${project.title}`}
                            className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openInInternalBrowser(project.repositoryUrl)}
                            aria-label={`Open repository for ${project.title}`}
                            className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
