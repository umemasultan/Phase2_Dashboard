interface FilterBarProps {
  currentFilter: 'all' | 'pending' | 'in-progress' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'in-progress' | 'completed') => void;
}

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
      {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`relative px-6 py-3 rounded-2xl capitalize transition-all duration-300 font-bold text-sm whitespace-nowrap overflow-hidden group flex-shrink-0 ${
            currentFilter === status
              ? 'text-white shadow-2xl transform scale-110'
              : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 shadow-lg hover:shadow-2xl hover:scale-105 backdrop-blur-xl border border-white/30 dark:border-gray-600/30'
          }`}
        >
          {currentFilter === status && (
            <>
              <span className="absolute inset-0 bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] rounded-2xl animate-gradient"></span>
              <span className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></span>
            </>
          )}
          <span className="relative z-10 flex items-center gap-2">
            {status === 'all' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            {status === 'pending' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {status === 'in-progress' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            {status === 'completed' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {status.replace('-', ' ')}
          </span>
          {currentFilter !== status && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#050E3C]/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
        </button>
      ))}
    </div>
  );
}