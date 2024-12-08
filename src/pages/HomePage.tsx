import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieGrid from "../components/movies/MovieGrid";
import MovieSearchBar from "../components/movies/MovieSearchBar";
import { RootState, AppDispatch } from "../redux/store";
import { fetchMovies } from "../services/omdbApi";
import {
  setMovies,
  setLoading,
  setError,
  setTotalResults,
} from "../redux/movies/moviesSlice"; 

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, year, type } = useSelector(
    (state: RootState) => state.filters
  );
  const { page } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        dispatch(setLoading(true));
        const { movies, totalResults } = await fetchMovies(
          searchQuery,
          page,
          year,
          type
        );

        dispatch(setMovies(movies));
        dispatch(setTotalResults(totalResults));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(
          setError(error instanceof Error ? error.message : "An error occurred")
        );
        dispatch(setLoading(false));
      }
    };

    loadMovies();
  }, [searchQuery, page, year, type, dispatch]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">
        Movie Information App
      </h1>
      <MovieSearchBar />
      <MovieGrid />
    </div>
  );
};

export default HomePage;
