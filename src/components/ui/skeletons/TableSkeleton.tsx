export default function TableSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Search and Button */}
      <div className="flex justify-between items-center">
        <div className="w-80 h-10 bg-gray-200 rounded" />
      </div>
      {/* Summary boxes */}
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="w-40 h-10 rounded-lg bg-gray-200" />
        ))}
      </div>
      {/* Table Header */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-300 text-sm font-semibold text-gray-600">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-20" />
          ))}
        </div>

        {/* Placeholder rows */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-7 gap-4 items-center p-4 border-b border-gray-100"
          >
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded w-24" />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-4">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
