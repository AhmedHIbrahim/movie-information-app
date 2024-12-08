import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

interface MoviesState {
  list: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalResults: number;
}

const initialState: MoviesState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  totalResults: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    },
  },
});

export const { setMovies, setLoading, setError, setPage, setTotalResults } =
  moviesSlice.actions;

export default moviesSlice.reducer;
