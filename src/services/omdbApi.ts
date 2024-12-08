import axios from "axios";
import { Movie } from "../redux/movies/moviesSlice";
import { OmdbMovieDetails } from "@/types/omdb";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export const fetchMovies = async (
  searchQuery: string,
  page: number = 1,
  year?: string,
  type?: string
) => {
  try {
    const response = await axios.get<SearchResponse>(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchQuery,
        page,
        y: year,
        type: type === "all" ? "" : type,
      },
    });

    if (response.data.Response === "False") {
      throw new Error("No movies found");
    }

    return {
      movies: response.data.Search,
      totalResults: parseInt(response.data.totalResults, 10),
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: "full",
      },
    });

    return response.data as OmdbMovieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
