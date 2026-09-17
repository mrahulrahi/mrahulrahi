'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Code2,
  Cpu,
  GraduationCap,
  Sparkles,
  BookOpen,
  Mail,
  FileText,
  SunMoon,
  Github,
  Linkedin,
  Youtube,
  Camera,
  ExternalLink,
  ArrowRight,
  X,
  Layers,
  Wrench,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import useDarkMode from '@/app/hooks/useDarkMode';
import './CommandPalette.css';

interface CommandItem {
  id: string;
  label: string;
  description: string;
  category: 'Navigation' | 'Actions' | 'Social' | 'Workspace';
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);
  
  const router = useRouter();
  const { isDark, toggle: toggleTheme } = useDarkMode();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        router.push(`/#${sectionId}`);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'nav-projects',
      label: 'Crafted With Code (Projects)',
      description: 'Explore featured web apps and front-end builds',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4" />,
      badge: '#portfolio',
      action: () => scrollToSection('portfolio'),
      keywords: ['projects', 'work', 'showcase', 'apps', 'portfolio', 'frontend']
    },
    {
      id: 'nav-toolkit',
      label: 'The Toolkit (Skills & Tech Stack)',
      description: 'React, Next.js, TypeScript, Tailwind, CSS & more',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4" />,
      action: () => scrollToSection('about'),
      keywords: ['skills', 'stack', 'toolkit', 'tech', 'react', 'nextjs', 'javascript']
    },
    {
      id: 'nav-about',
      label: 'The Journey So Far',
      description: 'Education, Work Experience & Rahul’s Bio',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4" />,
      badge: '#about',
      action: () => scrollToSection('about'),
      keywords: ['about', 'journey', 'experience', 'education', 'bio', 'stats']
    },
    {
      id: 'nav-certificates',
      label: 'Continuous Learning',
      description: 'Verified Certifications and Specialized Courses',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4" />,
      badge: '#continuousLearning',
      action: () => scrollToSection('continuousLearning'),
      keywords: ['certificates', 'courses', 'learning', 'education']
    },
    {
      id: 'nav-interests',
      label: 'Beyond The Code',
      description: 'Photography on GuruShots & YouTube tech channel',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4" />,
      badge: '#sideHustle',
      action: () => scrollToSection('sideHustle'),
      keywords: ['interests', 'hobbies', 'photography', 'youtube', 'side hustle']
    },
    {
      id: 'nav-articles',
      label: 'Articles & Insights',
      description: 'Dev.to technical publications and blog posts',
      category: 'Navigation',
      icon: <BookOpen className="w-4 h-4" />,
      badge: '#articles',
      action: () => scrollToSection('articles'),
      keywords: ['articles', 'blog', 'dev.to', 'writing', 'posts']
    },

    // Quick Actions
    {
      id: 'act-resume',
      label: 'Download / View Resume',
      description: 'Open Rahul’s latest interactive resume',
      category: 'Actions',
      icon: <FileText className="w-4 h-4" />,
      badge: 'PDF',
      action: () => {
        setIsOpen(false);
        window.open('https://flowcv.com/resume/29mh2gwpwu', '_blank');
      },
      keywords: ['resume', 'cv', 'download', 'hire', 'bio']
    },
    {
      id: 'act-email',
      label: 'Copy Email Address',
      description: 'Copy mrahulrahi@gmail.com to clipboard',
      category: 'Actions',
      icon: <Mail className="w-4 h-4" />,
      badge: 'Copy',
      action: () => {
        setIsOpen(false);
        if (navigator.clipboard) {
          navigator.clipboard.writeText('mrahulrahi@gmail.com');
          showToast('📋 Copied "mrahulrahi@gmail.com" to clipboard!');
        }
      },
      keywords: ['email', 'contact', 'mail', 'hire', 'reach out']
    },
    {
      id: 'act-theme',
      label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      description: `Toggle website visual theme (currently ${isDark ? 'Dark' : 'Light'})`,
      category: 'Actions',
      icon: <SunMoon className="w-4 h-4" />,
      badge: isDark ? 'Light' : 'Dark',
      action: () => {
        toggleTheme();
        setIsOpen(false);
        showToast(isDark ? '☀️ Switched to Light Mode' : '🌙 Switched to Dark Mode');
      },
      keywords: ['theme', 'dark mode', 'light mode', 'toggle', 'color']
    },

    // Workspace & Lab
    {
      id: 'ws-workspace',
      label: 'Open Developer Workspace',
      description: 'Live interactive developer lab and experimental tools',
      category: 'Workspace',
      icon: <Cpu className="w-4 h-4" />,
      badge: '/workspace',
      action: () => {
        setIsOpen(false);
        router.push('/workspace');
      },
      keywords: ['workspace', 'tools', 'lab', 'dev']
    },
    {
      id: 'ws-tools',
      label: 'Developer Tools Directory',
      description: 'Curated utilities, formatters, and generators',
      category: 'Workspace',
      icon: <Wrench className="w-4 h-4" />,
      badge: '/tools',
      action: () => {
        setIsOpen(false);
        router.push('/tools');
      },
      keywords: ['tools', 'utilities', 'formatters']
    },
    {
      id: 'ws-ui',
      label: 'UI Component Sandbox',
      description: 'Interactive UI components and design systems',
      category: 'Workspace',
      icon: <Layers className="w-4 h-4" />,
      badge: '/ui',
      action: () => {
        setIsOpen(false);
        router.push('/ui');
      },
      keywords: ['ui', 'components', 'library', 'sandbox']
    },

    // Social Links
    {
      id: 'soc-github',
      label: 'GitHub Profile',
      description: 'github.com/mrahulrahi - Repositories and Open Source',
      category: 'Social',
      icon: <Github className="w-4 h-4" />,
      badge: 'External',
      action: () => {
        setIsOpen(false);
        window.open('https://github.com/mrahulrahi/', '_blank');
      },
      keywords: ['github', 'code', 'git', 'open source']
    },
    {
      id: 'soc-linkedin',
      label: 'LinkedIn Network',
      description: 'linkedin.com/in/mrahulrahi - Professional Profile',
      category: 'Social',
      icon: <Linkedin className="w-4 h-4" />,
      badge: 'External',
      action: () => {
        setIsOpen(false);
        window.open('https://linkedin.com/in/mrahulrahi/', '_blank');
      },
      keywords: ['linkedin', 'connect', 'job', 'network']
    },
    {
      id: 'soc-youtube',
      label: 'YouTube Tech Channel',
      description: '@fireliquidator - Tech reviews and setup unboxings',
      category: 'Social',
      icon: <Youtube className="w-4 h-4" />,
      badge: 'External',
      action: () => {
        setIsOpen(false);
        window.open('https://www.youtube.com/@fireliquidator', '_blank');
      },
      keywords: ['youtube', 'videos', 'tech', 'channel', 'fireliquidator']
    },
    {
      id: 'soc-photography',
      label: 'Photography on GuruShots',
      description: 'gurushots.com/rahicreations - Visual photography showcase',
      category: 'Social',
      icon: <Camera className="w-4 h-4" />,
      badge: 'External',
      action: () => {
        setIsOpen(false);
        window.open('https://gurushots.com/rahicreations', '_blank');
      },
      keywords: ['photography', 'photos', 'gurushots', 'creations', 'camera']
    }
  ], [isDark, toggleTheme, router]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const cleanQuery = query.toLowerCase().trim();
    return commands.filter(item => {
      const matchLabel = item.label.toLowerCase().includes(cleanQuery);
      const matchDesc = item.description.toLowerCase().includes(cleanQuery);
      const matchCat = item.category.toLowerCase().includes(cleanQuery);
      const matchKeywords = item.keywords?.some(k => k.toLowerCase().includes(cleanQuery));
      return matchLabel || matchDesc || matchCat || matchKeywords;
    });
  }, [query, commands]);

  // Reset index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      // Open on '/' if not typing in an input
      if (
        e.key === '/' &&
        !isOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, filteredCommands, selectedIndex]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: { [key: string]: { item: CommandItem; globalIndex: number }[] } = {};
    filteredCommands.forEach((item, index) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push({ item, globalIndex: index });
    });
    return groups;
  }, [filteredCommands]);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="cp-toast">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="command-palette-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="command-palette-modal" role="dialog" aria-modal="true">
            {/* Search Bar */}
            <div className="cp-search-box">
              <span className="cp-search-icon">
                <Search className="w-5 h-5" />
              </span>
              <input
                ref={inputRef}
                type="text"
                className="cp-input"
                placeholder="Type a command or search sections, resume, tools..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Command search"
              />
              {query ? (
                <button
                  className="cp-clear-btn"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="cp-kbd-badge">{isMac ? '⌘K' : 'Ctrl+K'}</span>
              )}
            </div>

            {/* Results */}
            <div className="cp-results-list" ref={listRef}>
              {filteredCommands.length === 0 ? (
                <div className="cp-empty-state">
                  <div className="cp-empty-icon">🔍</div>
                  <p className="fw-semibold mb-1">No matching commands found</p>
                  <p className="text-xs opacity-60 mb-0">Try searching for "Projects", "Resume", "Theme", or "Email"</p>
                </div>
              ) : (
                Object.entries(groupedCommands).map(([category, items]) => (
                  <div key={category} className="cp-group">
                    <div className="cp-group-title">{category}</div>
                    {items.map(({ item, globalIndex }) => {
                      const isSelected = globalIndex === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          className={`cp-item ${isSelected ? 'active' : ''}`}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <div className="cp-item-left">
                            <span className="cp-item-icon">{item.icon}</span>
                            <div className="cp-item-info">
                              <span className="cp-item-label">{item.label}</span>
                              <span className="cp-item-desc">{item.description}</span>
                            </div>
                          </div>
                          <div className="cp-item-right">
                            {item.badge && <span className="cp-item-badge">{item.badge}</span>}
                            <ArrowRight className="w-4 h-4 cp-item-enter" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="cp-footer">
              <div className="cp-footer-shortcuts">
                <span className="cp-footer-item">
                  <kbd className="cp-kbd-badge">↑</kbd>
                  <kbd className="cp-kbd-badge">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="cp-footer-item">
                  <kbd className="cp-kbd-badge">↵</kbd>
                  <span>Select</span>
                </span>
                <span className="cp-footer-item">
                  <kbd className="cp-kbd-badge">esc</kbd>
                  <span>Close</span>
                </span>
              </div>
              <div className="cp-footer-hint text-xs">
                <span>Rahul Maurya Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
