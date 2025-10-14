import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800',
  secondary: 'bg-gray-900 text-white hover:bg-gray-800',
  outline: 'bg-white text-black border border-gray-300 hover:border-gray-400',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
};

const sizeStyles = {
  sm: 'px-4 py-2.5 md:py-1.5 text-sm min-h-[45px] md:min-h-0',
  md: 'px-6 py-3 md:py-1 text-sm min-h-[45px] md:min-h-0',
  lg: 'px-6 py-3.5 md:py-2 text-base min-h-[45px] md:min-h-0'
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2 leading-6 cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`.trim();

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}