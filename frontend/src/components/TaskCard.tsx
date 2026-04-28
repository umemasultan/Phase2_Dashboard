import Link from 'next/link';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="glass-card overflow-hidden hover:shadow-md transition-all">
      {/* Status indicator bar */}
      <div className={`h-1 ${
        task.status === 'pending'
          ? 'bg-yellow-500'
          : task.status === 'in-progress'
            ? 'bg-blue-500'
            : 'bg-green-500'
      }`}></div>

      <div className="p-3 sm:p-4">
        <Link href={`/tasks/${task.id}`}>
          <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors flex-1 line-clamp-2">
              {task.title}
            </h3>
            <svg className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <p className="text-muted-foreground mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-sm">
          {task.description || 'No description provided'}
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          {/* Status Badge */}
          <span className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded ${
            task.status === 'pending'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : task.status === 'in-progress'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
            <span>{task.status.replace('-', ' ')}</span>
          </span>

          {/* Date Badge */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] sm:text-xs">
              {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}