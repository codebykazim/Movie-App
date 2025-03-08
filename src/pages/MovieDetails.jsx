import React, { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailers } from "../services/api";
import { useMovieContext } from "../context/MovieContext";
import { Loader } from "lucide-react";

const MovieDetails = () => {
  const { selectedMovie } = useMovieContext();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const details = await getMovieDetails(selectedMovie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [selectedMovie]);

  useEffect(() => {
    const loadTrailer = async () => {
      try {
        const trailerResponse = await getMovieTrailers(selectedMovie.id);
        const trailer = trailerResponse.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error(error);
      }
    };
    loadTrailer();
  }, [selectedMovie]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black">
        <Loader className="animate-spin text-white" size={32} />
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black text-white">
        No movie details available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white pb-12">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Poster */}
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-full rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 md:pl-12 mt-8 md:mt-0">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              {movieDetails.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 italic mb-6">
              {movieDetails.tagline}
            </p>

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <span className="text-gray-400 font-semibold">
                  Release Date:
                </span>
                <span className="text-white ml-2">
                  {movieDetails.release_date}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Runtime:</span>
                <span className="text-white ml-2">
                  {movieDetails.runtime} minutes
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Genres:</span>
                <span className="text-white ml-2">
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Rating:</span>
                <span className="text-white ml-2">
                  {movieDetails.vote_average} / 10 ({movieDetails.vote_count}{" "}
                  votes)
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Overview</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {movieDetails.overview}
              </p>
            </div>

            {/* Official Website */}
            {movieDetails.homepage && (
              <div className="mb-8">
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Official Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      <div className="px-4 sm:px-8 mt-8 sm:mt-12">
        {trailerKey ? (
          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border-4 border-purple-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-75"></div>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?controls=1&enablejsapi=1`}
                title="Movie Trailer"
                frameBorder="0"
                sandbox="allow-same-origin allow-scripts allow-presentation"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-300 text-lg">
            No trailer available.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
