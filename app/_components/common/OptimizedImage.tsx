'use client';

import Image from 'next/image';
import { useImageWithRetry } from '@/app/_hooks/useImageWithRetry';
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
  const isValidSrc = src && src.trim() !== '';

  // Always call hook (React rules), but with fallback src
  const { currentSrc, isLoading, hasError, handleError, handleLoad, key } = useImageWithRetry({
    src: isValidSrc ? src : 'placeholder'
  });

  // Show fallback immediately for invalid src
  if (!isValidSrc) {
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
      {isLoading && !hasError && (
        <ImageSkeleton
          className="absolute inset-0 w-full h-full"
          rounded={rounded}
        />
      )}

      {hasError ? (
        <div
          className={`bg-gray-200 ${rounded ? 'rounded' : ''} ${className}`}
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        />
      ) : (
        <Image
          key={key}
          src={currentSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={sizes}
          className={className}
          priority={priority}
          loading={priority ? 'eager' : loading}
          onError={handleError}
          onLoad={handleLoad}
          draggable={false}
        />
      )}
    </div>
  );
}
