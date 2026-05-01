import Link from "next/link";

export default function movieRow({ title, movies, href }) {
  return (
    <section className="px-4 md:px-10 py-6">
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.slice(0, 10).map((movie) => (
          <div key={movie.id} className="group shrink-0 w-36 cursor-pointer">
            <div className="relative rounded-xl overflow-hidden aspect-[2/3]">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-amber-400 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </div>
            </div>
            <p className="text-white text-xs font-medium mt-2 line-clamp-2 leading-snug">
              {movie.title}
            </p>
            <p className="text-gray-500 text-[11px] mt-0.5">
              {movie.release_date?.slice(0, 4) ?? "—"}
            </p>
          </div>
        ))}

        <Link href={href} className="group shrink-0 w-36">
          <div className="aspect-[2/3] rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="text-white text-xs font-medium">See all</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
