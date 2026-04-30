import React from "react";
import { getTopratedMovies } from "../../../../lib/tmdb";
import MoviesGrid from "@/app/components/movieGrid";

const page = async () => {
  const movies = await getTopratedMovies();
  return (
    <div>
      {/* your home content */}
      <MoviesGrid movies={movies.results} />
    </div>
  );
};

export default page;
