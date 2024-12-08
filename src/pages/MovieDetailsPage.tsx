import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../services/omdbApi";

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Poster: string;
  imdbRating: string;
  Type: string;
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        if (!id) {
          throw new Error("No movie ID provided");
        }
        const details = await fetchMovieDetails(id);
        setMovie(details);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!movie) return <div className="text-center">No movie details found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back to List
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={
              movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.png"
            }
            alt={movie.Title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
              <p>
                <strong>Rated:</strong> {movie.Rated}
              </p>
              <p>
                <strong>Released:</strong> {movie.Released}
              </p>
              <p>
                <strong>Runtime:</strong> {movie.Runtime}
              </p>
            </div>
            <div>
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Language:</strong> {movie.Language}
              </p>
              <p>
                <strong>Country:</strong> {movie.Country}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Plot</h2>
            <p>{movie.Plot}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Actors</h2>
            <p>{movie.Actors}</p>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-lg font-bold mr-2">IMDb Rating:</span>
            <span className="text-yellow-500 text-xl">
              {movie.imdbRating}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
