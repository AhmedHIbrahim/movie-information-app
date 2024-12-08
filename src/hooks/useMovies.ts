import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../services/omdbApi";
import { Movie } from "../redux/movies/moviesSlice";

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  fetchMoreMovies: (page: number) => Promise<void>;
}

export const useMovies = (
  searchQuery: string,
  page: number,
  year?: string,
  type?: string
): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);

  const fetchMoreMovies = useCallback(
    async (currentPage: number) => {
      try {
        setLoading(true);
        const { movies: fetchedMovies, totalResults: total } =
          await fetchMovies(searchQuery, currentPage, year, type);

        setMovies(fetchedMovies);
        setTotalResults(total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, year, type]
  );

  useEffect(() => {
    fetchMoreMovies(page);
  }, [searchQuery, page, year, type, fetchMoreMovies]);

  return {
    movies,
    loading,
    error,
    totalResults,
    fetchMoreMovies,
  };
};
