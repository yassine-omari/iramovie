export default function GridLoading() {
  return (
    <div className="px-4 md:px-10 py-8">
      {/* Page title skeleton */}
      <div className="h-5 w-48 bg-white/10 rounded-full animate-pulse mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-2xl bg-white/10 aspect-[2/3]" />
            <div className="h-3 w-3/4 bg-white/10 rounded-full mt-3" />
            <div className="h-2.5 w-1/3 bg-white/10 rounded-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
