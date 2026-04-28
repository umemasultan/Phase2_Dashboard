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
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300';

  const variantClasses = {
    primary: 'btn-premium focus:ring-primary/50',
    secondary: 'glass-card text-foreground hover:bg-secondary/80 focus:ring-primary/30',
    danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-red-500',
    outline: 'glass-card border-2 border-border text-foreground hover:border-primary/50 focus:ring-primary/30'
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 sm:px-4 sm:py-2',
    md: 'text-sm px-4 py-2 sm:px-6 sm:py-2.5',
    lg: 'text-base px-6 py-2.5 sm:px-8 sm:py-3'
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