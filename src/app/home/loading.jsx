export default function HomeLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <div className="relative w-full h-[70vh] min-h-[420px] max-h-[600px] bg-[#111111] animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-6 md:px-10 pb-10 max-w-2xl gap-3">
          <div className="h-3 w-24 bg-white/10 rounded-full" />
          <div className="h-10 w-72 bg-white/10 rounded-xl" />
          <div className="h-3 w-96 bg-white/10 rounded-full" />
          <div className="h-3 w-80 bg-white/10 rounded-full" />
          <div className="flex gap-3 mt-2">
            <div className="h-10 w-28 bg-white/10 rounded-xl" />
            <div className="h-10 w-28 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Movie rows skeleton */}
      {[1, 2, 3].map((row) => (
        <section key={row} className="px-4 md:px-10 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-40 bg-white/10 rounded-full animate-pulse" />
            <div className="h-4 w-16 bg-white/10 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="shrink-0 w-36 animate-pulse">
                <div className="rounded-xl bg-white/10 aspect-[2/3]" />
                <div className="h-3 w-24 bg-white/10 rounded-full mt-2" />
                <div className="h-2.5 w-12 bg-white/10 rounded-full mt-1.5" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
