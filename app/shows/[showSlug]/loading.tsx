export default function ShowLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      {/* Back navigation skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded mb-10"></div>

      {/* Show detail card skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex gap-8">
          {/* Image skeleton */}
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0"></div>

          <div className="flex-1">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>

            {/* Author skeleton */}
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>

            {/* Description skeleton - 3 lines */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
              <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes section skeleton */}
      <div>
        {/* Section title */}
        <div className="h-7 bg-gray-200 rounded w-32 mb-6"></div>

        {/* Episode list skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}