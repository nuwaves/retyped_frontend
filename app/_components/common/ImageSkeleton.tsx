interface ImageSkeletonProps {
  className?: string;
  rounded?: boolean;
}

export default function ImageSkeleton({ className = '', rounded = false }: ImageSkeletonProps) {
  const roundedClass = rounded ? 'rounded' : '';

  return (
    <div
      className={`bg-gray-200 animate-pulse ${roundedClass} ${className}`}
      aria-label="Loading image"
    />
  );
}
