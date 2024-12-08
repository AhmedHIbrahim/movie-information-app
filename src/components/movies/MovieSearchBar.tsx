import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSearchQuery,
  setYear,
  setType,
} from "../../redux/filters/filtersSlice";
import { RootState } from "../../redux/store";

const MovieSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, year, type } = useSelector(
    (state: RootState) => state.filters
  );
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localYear, setLocalYear] = useState(year);
  const [localType, setLocalType] = useState(type);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
    dispatch(setYear(localYear));
    dispatch(setType(localType));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search movies..."
        className="flex-grow px-4 py-2 border rounded-md"
      />
      <input
        type="text"
        value={localYear}
        onChange={(e) => setLocalYear(e.target.value)}
        placeholder="Year (optional)"
        className="w-26 px-2 py-2 border rounded-md"
      />
      <select
        value={localType}
        onChange={(e) => setLocalType(e.target.value as any)}
        className="w-32 px-2 py-2 border rounded-md"
      >
        <option value="all">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
        <option value="episode">Episodes</option>
      </select>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default MovieSearchBar;
