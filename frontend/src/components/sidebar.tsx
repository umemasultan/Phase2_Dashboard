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
    <aside className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'sticky top-0'} bg-white/80 dark:bg-gray-700/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-r border-white/30 dark:border-gray-600/30 ${isExpanded ? 'w-64' : 'w-20'} transition-all duration-500 h-screen overflow-y-auto`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#15173D]/5 via-purple-500/5 to-[#15173D]/5 pointer-events-none"></div>

      <div className="relative p-5 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gradient-to-r hover:from-[#15173D] hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110 group overflow-hidden shadow-lg"
          >
            <span className="absolute inset-0 bg-gray-100 dark:bg-gray-600 rounded-xl opacity-100 group-hover:opacity-0 transition-opacity"></span>
            <span className="relative z-10 font-bold text-base">{isExpanded ? '«' : '»'}</span>
          </button>
          {isMobile && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-500 hover:text-white md:hidden transition-all duration-300 shadow-lg"
            >
              ✕
            </button>
          )}
        </div>

        {isExpanded && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-black bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] dark:from-[#393E46] dark:via-purple-400 dark:to-[#393E46] bg-clip-text text-transparent mb-2 animate-gradient">
                Filters
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-[#050E3C] to-purple-600 rounded-full"></div>
            </div>

            <div className="mb-6 flex-1 space-y-2">
              <h3 className="text-xs font-black text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-widest">Status</h3>
              <ul className="space-y-2">
                {filters.map((filter) => (
                  <li key={filter.value}>
                    <Link
                      href={`/?filter=${filter.value}`}
                      className={`group relative block px-4 py-2.5 text-sm rounded-xl transition-all duration-300 font-bold overflow-hidden ${
                        pathname.includes(filter.value) || (filter.value === 'all' && pathname === '/')
                          ? 'text-white shadow-xl'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-105'
                      }`}
                    >
                      {(pathname.includes(filter.value) || (filter.value === 'all' && pathname === '/')) && (
                        <>
                          <span className="absolute inset-0 bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] rounded-xl animate-gradient"></span>
                          <span className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></span>
                        </>
                      )}
                      {!(pathname.includes(filter.value) || (filter.value === 'all' && pathname === '/')) && (
                        <span className="absolute inset-0 bg-gray-100 dark:bg-gray-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      )}
                      <span className="relative z-10 flex items-center justify-between">
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
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#050E3C] to-purple-600 rounded-2xl blur-lg opacity-30"></div>

              {/* Stats card */}
              <div className="relative bg-gradient-to-br from-[#050E3C]/5 via-purple-50 to-[#050E3C]/5 dark:from-[#050E3C]/30 dark:via-purple-800/30 dark:to-[#050E3C]/30 rounded-2xl p-4 shadow-2xl border border-white/50 dark:border-gray-600/50 backdrop-blur-xl">
                <h3 className="text-xs font-black text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-widest flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Statistics
                </h3>
                <ul className="space-y-2">
                  {stats.map((stat) => (
                    <li key={stat.name} className="flex justify-between items-center p-2.5 bg-white/60 dark:bg-gray-700/60 rounded-xl backdrop-blur-sm border border-white/30 dark:border-gray-600/30 min-w-0">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 truncate">{stat.name}</span>
                      <span className="text-xl font-black bg-gradient-to-r from-[#050E3C] to-purple-600 dark:from-[#393E46] dark:to-purple-400 bg-clip-text text-transparent flex-shrink-0">
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