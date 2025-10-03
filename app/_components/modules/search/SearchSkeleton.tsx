export default function SearchSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Episode cards skeleton */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded px-6 pt-8 pb-15">
          {/* Show name */}
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>

          {/* Episode title */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>

          {/* Description */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
