'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile on initial render and on resize
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const stats = [
    { name: 'Total Tasks', value: 12 },
    { name: 'Pending', value: 5 },
    { name: 'In Progress', value: 4 },
    { name: 'Completed', value: 3 },
  ];

  const filters = [
    { name: 'All Tasks', value: 'all' },
    { name: 'Pending', value: 'pending' },
    { name: 'In Progress', value: 'in-progress' },
    { name: 'Completed', value: 'completed' },
  ];

  const filterIcons: { [key: string]: string } = {
    'all': 'M4 6h16M4 12h16M4 18h16',
    'pending': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'in-progress': 'M13 10V3L4 14h7v7l9-11h-7z',
    'completed': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  };

  // Hide sidebar on mobile completely - navigation is in navbar mobile menu
  if (isMobile) {
    return null;
  }

  return (
    <aside className={`sticky top-0 border-r bg-card ${isExpanded ? 'w-60' : 'w-16'} transition-all duration-200 h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-md hover:bg-secondary transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {filters.map((filter) => (
            <Link
              key={filter.value}
              href={`/?filter=${filter.value}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                pathname.includes(filter.value) || (filter.value === 'all' && pathname === '/')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
              title={filter.name}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={filterIcons[filter.value]} />
              </svg>
              {isExpanded && <span>{filter.name}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Stats Footer */}
      {isExpanded && (
        <div className="p-4 border-t bg-secondary/30">
          <div className="space-y-2">
            {stats.map((stat) => (
              <div key={stat.name} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{stat.name}</span>
                <span className="font-semibold text-foreground px-2 py-0.5 bg-background rounded">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}