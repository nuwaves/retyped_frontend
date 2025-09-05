interface PillProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'outline' | 'solid';
  className?: string;
}

const sizeStyles = {
  xs: 'px-4 py-0.5 text-[10px]',
  sm: 'px-4 py-1 text-xs',
  md: 'px-6 py-1.5 text-sm'
};

const variantStyles = {
  outline: 'border border-black text-black bg-transparent',
  solid: 'bg-black text-white border border-black'
};

export default function Pill({ 
  children, 
  size = 'sm', 
  variant = 'outline',
  className = ''
}: PillProps) {
  const baseStyles = 'inline-block font-medium rounded-full w-fit transition-colors';
  
  const pillClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();
  
  return (
    <span className={pillClasses}>
      {children}
    </span>
  );
}