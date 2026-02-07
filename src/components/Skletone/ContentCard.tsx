export default function ContentCardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 h-full overflow-y-auto">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full animate-pulse mb-10"
          >
            {/* Delete Icon Placeholder */}
            <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-300 rounded-full" />

            {/* Image Placeholder */}
            <div className="relative">
              <div className="h-44 w-full bg-gray-300" />
            </div>

            {/* Content Placeholder */}
            <div className="p-6 space-y-3">
              <div className="h-6 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
