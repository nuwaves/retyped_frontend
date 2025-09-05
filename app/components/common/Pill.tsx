interface PillProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'outline' | 'solid';
  className?: string;
}

const sizeStyles = {
  xs: 'px-4 py-0.5 text-[11px] font-bold leading-[155%] tracking-normal',
  sm: 'px-4 py-1 text-xs font-bold leading-[155%] tracking-normal',
  md: 'px-6 py-1.5 text-sm font-bold leading-[155%] tracking-normal'
};

const variantStyles = {
  outline: 'border border-black text-black bg-transparent',
  solid: 'bg-black/15 text-black border border-transparent'
};

export default function Pill({ 
  children, 
  size = 'sm', 
  variant = 'outline',
  className = ''
}: PillProps) {
  const baseStyles = 'inline-block rounded-full w-fit';
  
  const pillClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();
  
  return (
    <span className={pillClasses}>
      {children}
    </span>
  );
}