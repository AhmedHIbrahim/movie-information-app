import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { setPage } from "../../redux/movies/moviesSlice";
import Pagination from "../common/Pagination";

const MovieGrid: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: movies,
    loading,
    error,
    page: currentPage,
    totalResults,
  } = useSelector((state: RootState) => state.movies);

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-xl text-indigo-600">
        Loading movies...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );

  if (!movies || movies.length === 0)
    return (
      <div className="text-center text-gray-500 text-lg p-4">
        No movies found
      </div>
    );

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 xl:gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => handleMovieClick(movie.imdbID)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "/placeholder-movie.png"
                }
                alt={movie.Title}
                className="w-full h-64 md:h-80 object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="p-3 bg-gray-50">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">
                  {movie.Title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {movie.Year} | {movie.Type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MovieGrid;
