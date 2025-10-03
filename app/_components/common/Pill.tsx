interface PillProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'outline' | 'solid' | 'filled';
  radius?: 'xs' | 'sm' | 'md' | 'full';
  icon?: boolean;
  className?: string;
}

const sizeStyles = {
  xs: 'px-4 py-0.5 text-[10px] font-normal leading-[155%] tracking-normal',
  sm: 'px-4 py-1 text-xs font-normal leading-[155%] tracking-normal',
  md: 'px-6 py-1.5 text-sm font-bold leading-[155%] tracking-normal'
};

const variantStyles = {
  outline: 'border border-black text-black bg-transparent',
  solid: 'bg-black/15 text-black border border-transparent',
  filled: 'bg-slate-200 text-gray-500'
};

const radiusStyles = {
  xs: 'rounded',
  sm: 'rounded-md',
  md: 'rounded-lg',
  full: 'rounded-full'
};

export default function Pill({
  children,
  size = 'sm',
  variant = 'outline',
  radius = 'full',
  className = ''
}: PillProps) {
  const baseStyles = 'inline-block w-fit select-none cursor-pointer hover:text-black transition-all duration-100';

  const pillClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${radiusStyles[radius]} ${className}`.trim();

  return (
    <span className={pillClasses}>
      {children}
    </span>
  );
}