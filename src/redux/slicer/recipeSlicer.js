// c'Est la ou on enregistre tout les recettes comme state general,et puis la meme chose pour les filtres
// enregistrés

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilters: [],
  recipes: null,
};

export const recipeSlice = createSlice({
  name: "activeFilters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      console.log("name", action.payload.name);
      console.log("item", action.payload.item);
      state.activeFilters = action.payload;
    },
    removeFilter: (state, action) => {
      state.activeFilters = state.activeFilters.filter(
        (i) => Object.values(i) != action.payload
      );
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      console.log("setted");
    },
    changeTime: (state, action) => {
      const test = state.activeFilters.filter((i) => Object.keys(i) != "time");
      state.activeFilters = [...test, { time: action.payload }];
    },
    addFilter: (state, action) => {
      state.activeFilters = [
        ...state.activeFilters,
        { [action.payload.type]: action.payload.name },
      ];
      console.log("setted");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, removeFilter, setRecipes, addFilter, changeTime } =
  recipeSlice.actions;

export default recipeSlice.reducer;
