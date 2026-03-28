import Link from 'next/link';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="group relative animate-float">
      {/* Animated glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition duration-700 animate-pulse-glow"></div>

      {/* Card */}
      <div className="relative bg-white/95 dark:bg-gray-700/95 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-600/30 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] transition-all duration-700 transform hover:-translate-y-2 hover:rotate-1">
        {/* Animated gradient border */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#050E3C] via-purple-500 to-[#050E3C] animate-gradient"></div>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-shimmer"></div>
        </div>

        <div className="relative p-5">
          <Link href={`/tasks/${task.id}`}>
            <div className="flex items-start justify-between mb-2 gap-2">
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#050E3C] group-hover:via-purple-600 group-hover:to-[#050E3C] dark:group-hover:from-[#393E46] dark:group-hover:via-purple-400 dark:group-hover:to-[#393E46] group-hover:bg-clip-text transition-all duration-500 flex-1 line-clamp-2 min-w-0 break-words">
                {task.title}
              </h3>
              <div className="ml-2 p-1.5 rounded-lg bg-gradient-to-br from-[#050E3C]/10 to-purple-500/10 group-hover:from-[#050E3C]/20 group-hover:to-purple-500/20 transition-all flex-shrink-0">
                <svg className="w-4 h-4 text-[#050E3C] dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed text-sm break-words">{task.description}</p>

          <div className="flex justify-between items-center gap-2 flex-wrap">
            <div className="relative group/badge flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#050E3C] to-purple-600 rounded-xl blur opacity-20 group-hover/badge:opacity-40 transition-opacity"></div>
              <span className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-md backdrop-blur-sm border border-white/20 ${
                task.status === 'pending'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : task.status === 'in-progress'
                    ? 'bg-gradient-to-r from-[#050E3C] to-purple-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span className="relative z-10 uppercase tracking-wider whitespace-nowrap">{task.status.replace('-', ' ')}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600/50 dark:to-gray-500/50 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-500/50 flex-shrink-0">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs whitespace-nowrap">{task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#050E3C]/10 to-purple-500/10 rounded-bl-full"></div>
      </div>
    </div>
  );
}