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
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-500 transform hover:scale-105 relative overflow-hidden group';

  const variantClasses = {
    primary: 'btn-premium text-white focus:ring-purple-500',
    secondary: 'glass-card text-white hover:shadow-glow focus:ring-white/50',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-glow-lg focus:ring-red-500',
    outline: 'glass-card border-2 border-white/30 text-white hover:border-white/50 hover:shadow-glow focus:ring-white/50'
  };

  const sizeClasses = {
    sm: 'text-xs py-2 px-4',
    md: 'text-sm py-2.5 px-6',
    lg: 'text-base py-3 px-8'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}