export default function ProfileSkeleton() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-4 mt-4">
          {["Name", "Email", "Role", "Created date"].map((label, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
              <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-6" />

        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />

        <div className="h-10 w-40 bg-gray-300 rounded-lg mt-4 animate-pulse mx-auto" />
      </div>
    </div>
  );
}
