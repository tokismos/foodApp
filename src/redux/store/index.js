import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slicer/recipeSlicer";
import matchesReducer from "../slicer/MatchSlicer";

export const store = configureStore({
  reducer: {
    matchStore: matchesReducer,
    recipeStore: recipeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const createDebugger = require("redux-flipper").default;

    return getDefaultMiddleware().concat(createDebugger());

    //return getDefaultMiddleware();
  },
});
