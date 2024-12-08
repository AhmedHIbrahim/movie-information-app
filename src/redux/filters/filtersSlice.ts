import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  searchQuery: string;
  year: string;
  type: "movie" | "series" | "episode" | "all";
}

const initialState: FiltersState = {
  searchQuery: "Pokemon",
  year: "",
  type: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setType: (state, action: PayloadAction<FiltersState["type"]>) => {
      state.type = action.payload;
    },
  },
});

export const { setSearchQuery, setYear, setType } = filtersSlice.actions;

export default filtersSlice.reducer;
