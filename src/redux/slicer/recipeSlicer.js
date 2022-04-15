// c'Est la ou on enregistre tout les recettes comme state general,et puis la meme chose pour les filtres
// enregistrés

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilters: [],
  recipes: null,
  time: null,
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
    resetFilters: (state, action) => {
      state.activeFilters = [];
      state.time = null;
    },
    changeTime: (state, action) => {
      const filteredState = state.activeFilters.filter(
        (i) => Object.keys(i) != "tempsTotal"
      );
      if (action.payload == 0) {
        state.activeFilters = [...filteredState];
        return;
      }
      state.activeFilters = [...filteredState, { tempsTotal: action.payload }];
      state.time = action.payload;
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
export const {
  setFilters,
  removeFilter,
  setRecipes,
  addFilter,
  changeTime,
  resetFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
