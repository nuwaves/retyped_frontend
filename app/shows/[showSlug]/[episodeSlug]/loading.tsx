export default function EpisodeLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-10"></div>

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="h-8 bg-gray-200 rounded w-4/5 mb-4"></div>

            <div className="flex gap-4 mb-6">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            <div className="flex gap-4">
              <div className="h-10 w-28 bg-gray-200 rounded"></div>
              <div className="h-10 w-28 bg-gray-200 rounded"></div>
              <div className="h-10 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex border-b border-gray-200">
              <div className="h-12 w-32 bg-gray-200 m-2 rounded"></div>
              <div className="h-12 w-32 bg-gray-200 m-2 rounded"></div>
              <div className="h-12 w-32 bg-gray-200 m-2 rounded"></div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="w-[350px] flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>

            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </aside>
      </div>
    </div>
  );
}