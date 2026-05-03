import MovieGridCard from "./movieGridCard";

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
          <MovieGridCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
