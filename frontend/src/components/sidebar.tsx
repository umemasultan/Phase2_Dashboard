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
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
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

  return (
    <aside className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'sticky top-0'} glass border-r ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-500 h-screen overflow-y-auto`}>
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 rounded-lg hover:bg-secondary transition-all duration-300 hover:scale-110"
          >
            <span className="font-bold text-base text-foreground">{isExpanded ? '«' : '»'}</span>
          </button>
          {isMobile && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2.5 rounded-lg hover:bg-red-500 hover:text-white md:hidden transition-all duration-300"
            >
              ✕
            </button>
          )}
        </div>

        {isExpanded && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold gradient-text mb-2">
                Filters
              </h2>
              <div className="h-1 w-12 bg-primary rounded-full"></div>
            </div>

            <div className="mb-6 flex-1 space-y-2">
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">Status</h3>
              <ul className="space-y-2">
                {filters.map((filter) => (
                  <li key={filter.value}>
                    <Link
                      href={`/?filter=${filter.value}`}
                      className={`group relative block px-4 py-2.5 text-sm rounded-lg transition-all duration-300 font-semibold ${
                        pathname.includes(filter.value) || (filter.value === 'all' && pathname === '/')
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span>{filter.name}</span>
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="glass-card rounded-xl p-4">
                <h3 className="text-xs font-bold text-foreground mb-3 uppercase tracking-widest flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Statistics
                </h3>
                <ul className="space-y-2">
                  {stats.map((stat) => (
                    <li key={stat.name} className="flex justify-between items-center p-2.5 bg-secondary rounded-lg min-w-0">
                      <span className="text-xs font-semibold text-muted-foreground truncate">{stat.name}</span>
                      <span className="text-xl font-bold gradient-text flex-shrink-0">
                        {stat.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}