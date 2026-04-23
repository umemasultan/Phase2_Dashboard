import Link from 'next/link';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="group">
      <div className="glass-card rounded-xl overflow-hidden hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1">
        {/* Status indicator bar */}
        <div className={`h-1 ${
          task.status === 'pending'
            ? 'bg-yellow-500'
            : task.status === 'in-progress'
              ? 'bg-blue-500'
              : 'bg-green-500'
        }`}></div>

        <div className="p-6">
          <Link href={`/tasks/${task.id}`}>
            <div className="flex items-start justify-between mb-3 gap-3">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex-1 line-clamp-2">
                {task.title}
              </h3>
              <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <p className="text-muted-foreground mb-5 line-clamp-2 leading-relaxed text-sm">
            {task.description || 'No description provided'}
          </p>

          <div className="flex justify-between items-center gap-3 flex-wrap">
            {/* Status Badge */}
            <span className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold ${
              task.status === 'pending'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : task.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span className="uppercase tracking-wider">{task.status.replace('-', ' ')}</span>
            </span>

            {/* Date Badge */}
            <div className="flex items-center gap-2 text-muted-foreground flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium">
                {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}