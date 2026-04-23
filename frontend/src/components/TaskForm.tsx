import { Task } from '@/types/task';

interface TaskFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  status: 'pending' | 'in-progress' | 'completed';
  setStatus: (status: 'pending' | 'in-progress' | 'completed') => void;
  error?: string;
  onSubmit: (e: React.FormEvent) => void;
  submitText?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  error,
  onSubmit,
  submitText = 'Create Task',
  isEditing = false,
  onCancel
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="glass-card rounded-xl p-8 transition-all duration-300">
      {error && (
        <div className="mb-5 rounded-lg bg-red-100 dark:bg-red-900/30 p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-premium w-full"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="input-premium w-full resize-none"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-4">
          Status
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          {(['pending', 'in-progress', 'completed'] as const).map((option) => (
            <label key={option} className="inline-flex items-center cursor-pointer group bg-secondary hover:bg-secondary/80 px-4 py-3 rounded-lg transition-all duration-300">
              <input
                type="radio"
                name="status"
                checked={status === option}
                onChange={() => setStatus(option)}
                className="h-4 w-4 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="ml-3 text-sm text-foreground capitalize font-semibold">
                {option.replace('-', ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0">
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg text-sm font-semibold bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-premium px-8 py-3"
        >
          <span className="relative z-10">{submitText}</span>
        </button>
      </div>
    </form>
  );
}