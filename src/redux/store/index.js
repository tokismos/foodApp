import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../slicer/filterSlicer";
import matchesReducer from "../slicer/MatchSlicer";

export const store = configureStore({
  reducer: {
    matchStore: matchesReducer,
    filterStore: filterReducer,
  },
});
