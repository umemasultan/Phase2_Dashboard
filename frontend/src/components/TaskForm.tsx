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
    <form onSubmit={onSubmit} className="bg-white dark:bg-gray-700 shadow-2xl rounded-xl p-6 transition-colors border border-gray-200 dark:border-gray-600">
      {error && (
        <div className="mb-5 rounded-lg bg-red-50 dark:bg-red-900/30 p-3 border-l-4 border-red-500">
          <div className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</div>
        </div>
      )}

      <div className="mb-5">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Status
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 space-y-2 sm:space-y-0">
          {(['pending', 'in-progress', 'completed'] as const).map((option) => (
            <label key={option} className="inline-flex items-center cursor-pointer group">
              <input
                type="radio"
                name="status"
                checked={status === option}
                onChange={() => setStatus(option)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {option.replace('-', ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-500 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#050E3C] to-purple-600 dark:from-[#050E3C] dark:to-purple-500 hover:from-[#050E3C]/90 hover:to-purple-700 dark:hover:from-[#050E3C] dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}