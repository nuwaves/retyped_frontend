'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageSkeleton from './ImageSkeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  rounded?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = '',
  containerClassName = '',
  priority = false,
  loading = 'lazy',
  rounded = false
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!priority);

  const isValidSrc = src && src.trim() !== '';

  if (!isValidSrc || hasError) {
    return (
      <div className={`relative ${containerClassName}`}>
        <div
          className={`bg-gray-200 ${rounded ? 'rounded' : ''} ${className}`}
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        />
      </div>
    );
  }

  const wrapperClass = fill && !containerClassName
    ? 'relative w-full h-full'
    : `relative ${containerClassName}`;

  return (
    <div className={wrapperClass}>
      {isLoading && (
        <ImageSkeleton
          className="absolute inset-0 w-full h-full"
          rounded={rounded}
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        className={className}
        priority={priority}
        loading={priority ? 'eager' : loading}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        draggable={false}
      />
    </div>
  );
}
