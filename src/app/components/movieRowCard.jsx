import React from "react";
import Link from "next/link";

const MovieRowCard = ({ movie }) => {
  return (
    <Link href={`/home/movie/${movie.id}`}>
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
    </Link>
  );
};

export default MovieRowCard;
