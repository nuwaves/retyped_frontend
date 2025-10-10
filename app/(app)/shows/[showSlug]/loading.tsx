export default function ShowLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-10"></div>

      <div className="bg-white rounded-lg overflow-hidden mb-8">
        <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr] gap-3 md:gap-6 p-4 md:p-6">
          <div className="row-span-1 md:row-span-3 w-24 h-24 md:w-72 md:h-72 bg-gray-200 rounded-lg"></div>

          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="h-6 md:h-12 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            <div className="flex gap-3">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            <div className="flex gap-3">
              <div className="h-10 md:h-12 w-28 bg-gray-200 rounded-lg"></div>
              <div className="h-10 md:h-12 w-28 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="h-7 bg-gray-200 rounded w-32 mb-6"></div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
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