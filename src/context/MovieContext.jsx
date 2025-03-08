import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem("favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [selectedMovie, setSelectedMovie] = useState(() => {
    const savedMovie = localStorage.getItem("selectedMovie");
    return savedMovie ? JSON.parse(savedMovie) : null;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (selectedMovie) {
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    }
  }, [selectedMovie]);

  const addToFav = (movie) => {
    setFavorites((prev) => {
      if (!prev.some((m) => m.id === movie.id)) {
        const updatedFavorites = [...prev, movie];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
      return prev;
    });
  };

  const removeFromFav = (movieId) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFav = (movieId) => favorites.some((movie) => movie.id === movieId);

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFav,
        removeFromFav,
        isFav,
        selectedMovie,
        selectMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
