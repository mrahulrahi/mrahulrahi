'use client';

import React, { useState, useMemo } from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Filter, Code2 } from 'lucide-react';
import ProjectCard from '@/app/components/portfolio/ProjectCard/ProjectCard';
import Heading from '@/app/components/ui/Heading';
import './ProjectFilterSection.css';

export interface ProjectItem {
  id: number;
  label: string;
  title: string;
  imgUrl: string;
  gitHubUrl: string;
  liveUrl: string;
  para: string;
  technologies?: string[];
}

interface Props {
  projects: ProjectItem[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'nextjs', label: 'Next.js & React' },
  { id: 'web', label: 'Web & UI/UX' },
  { id: 'business', label: 'Business & Apps' }
];

export default function ProjectFilterSection({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Helper to match category
  const matchesCategory = (project: ProjectItem, categoryId: string): boolean => {
    if (categoryId === 'all') return true;
    
    const label = (project.label || '').toLowerCase();
    const title = (project.title || '').toLowerCase();
    const para = (project.para || '').toLowerCase();
    const tech = (project.technologies || []).map(t => t.toLowerCase()).join(' ');

    if (categoryId === 'nextjs') {
      return (
        tech.includes('next') ||
        tech.includes('react') ||
        label.includes('next') ||
        label.includes('react') ||
        para.includes('next.js') ||
        para.includes('react')
      );
    }

    if (categoryId === 'web') {
      return (
        label.includes('web') ||
        label.includes('design') ||
        label.includes('portfolio') ||
        para.includes('web') ||
        para.includes('portfolio') ||
        para.includes('responsive')
      );
    }

    if (categoryId === 'business') {
      return (
        label.includes('business') ||
        label.includes('app') ||
        label.includes('slicemypage') ||
        title.includes('nts') ||
        title.includes('soul') ||
        title.includes('projects done') ||
        para.includes('business') ||
        para.includes('client') ||
        para.includes('delivered')
      );
    }

    return true;
  };

  // Helper to match search query
  const matchesSearch = (project: ProjectItem, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const title = (project.title || '').toLowerCase();
    const label = (project.label || '').toLowerCase();
    const para = (project.para || '').toLowerCase();
    const tech = (project.technologies || []).map(t => t.toLowerCase()).join(' ');

    return title.includes(q) || label.includes(q) || para.includes(q) || tech.includes(q);
  };

  // Calculate counts for each tab
  const tabCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    CATEGORY_TABS.forEach(tab => {
      counts[tab.id] = (projects || []).filter(p => matchesCategory(p, tab.id)).length;
    });
    return counts;
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return (projects || []).filter(
      p => matchesCategory(p, activeCategory) && matchesSearch(p, searchQuery)
    );
  }, [projects, activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="project-filter-section w-100">
      <Heading heading="Crafted With Code" />

      {/* Filter and Search Bar Controls */}
      <div className="project-filter-controls">
        <div className="pfc-top-bar">
          {/* Category Tabs */}
          <div className="pfc-tabs-container" role="tablist">
            {CATEGORY_TABS.map(tab => {
              const isActive = activeCategory === tab.id;
              const count = tabCounts[tab.id] || 0;
              return (
                <button
                  key={tab.id}
                  className={`pfc-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                >
                  <span>{tab.label}</span>
                  <span className="pfc-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="pfc-search-wrapper">
            <span className="pfc-search-icon">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="pfc-search-input"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Filter projects"
            />
            {searchQuery && (
              <button
                className="pfc-clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Summary */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="pfc-stats-counter">
            <span>Showing</span>
            <span className="pfc-stats-badge">{filteredProjects.length}</span>
            <span>of {projects.length} featured builds</span>
          </div>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="btn btn-sm text-accent d-inline-flex align-items-center gap-1 p-0 border-0 bg-transparent text-decoration-underline"
              style={{ fontSize: '13px' }}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Project Cards Grid */}
      <motion.div layout className="project-card-list d-flex flex-wrap">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(card => (
            <motion.div
              layout
              key={card.id}
              className="project-card-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ProjectCard card={card} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="pfc-empty-state">
          <div className="pfc-empty-icon">🔍</div>
          <h4 className="pfc-empty-title">No projects found</h4>
          <p className="pfc-empty-desc">
            No projects match the search query "{searchQuery}" in this category. Try clearing your search or switching categories.
          </p>
          <button className="pfc-reset-btn" onClick={handleResetFilters}>
            View All Projects
          </button>
        </div>
      )}
    </div>
  );
}
