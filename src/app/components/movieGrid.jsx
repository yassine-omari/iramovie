export default function MoviesGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">🎬</span>
        <p className="text-gray-500 text-sm">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-[#111111] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Rating badge */}
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-amber-400 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <h2 className="text-white text-sm font-medium leading-snug line-clamp-2 mb-1">
                {movie.title}
              </h2>
              <p className="text-gray-500 text-[11px]">
                {movie.release_date?.slice(0, 4) ?? "—"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
