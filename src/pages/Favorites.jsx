import React from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (!favorites?.length) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-white mb-2">
          No Favorite Movies Yet
        </h2>
        <p className="text-gray-400">Start adding movies to your favorites.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Your Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
