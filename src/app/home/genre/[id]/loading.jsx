export default function GenreLoading() {
  return (
    <div className="px-4 md:px-10 py-8">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-16 bg-white/10 rounded-full animate-pulse" />
          <div className="h-6 w-32 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
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
