import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#050E3C] to-purple-600 dark:from-[#050E3C] dark:to-purple-500 text-white hover:from-[#050E3C]/90 hover:to-purple-700 dark:hover:from-[#050E3C] dark:hover:to-purple-600 focus:ring-purple-500',
    secondary: 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500 text-white hover:from-red-700 hover:to-pink-700 dark:hover:from-red-600 dark:hover:to-pink-600 focus:ring-red-500',
    outline: 'border-2 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-purple-500'
  };

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}