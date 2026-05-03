import Link from "next/link";
import MovieRowCard from "./movieRowCard";

export default function MovieRow({ title, movies, href }) {
  return (
    <section className="px-4 md:px-10 py-6">
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.slice(0, 10).map((movie) => (
          <MovieRowCard key={movie.id} movie={movie} />
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
