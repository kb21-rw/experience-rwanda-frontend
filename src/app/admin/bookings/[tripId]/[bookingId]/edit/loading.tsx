
export default function BookingFormLoading() {
  return (
    <div className="p-6">
      <div className="text-xl font-semibold mb-6 animate-pulse">
        Update Booking Information
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="space-y-4">
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-1" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-32 mb-1" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-28 mb-1" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
          <div className="h-10 bg-gray-400 rounded mt-4 w-36" />
        </div>


        <div className="space-y-4">
          <div>
            <div className="h-4 bg-gray-400 rounded w-32 mb-2" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-60" />
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-28" />
            </div>
          </div>

          <div className="pt-4">
            <div className="h-4 bg-gray-400 rounded w-28 mb-2" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-44" />
              <div className="h-4 bg-gray-200 rounded w-60" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
