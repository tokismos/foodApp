import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "../slicer/MatchSlicer";

export const store = configureStore({
  reducer: {
    matchStore: matchesReducer,
  },
});
