import { createSlice } from "@reduxjs/toolkit";
import { getFavoris } from "../../helpers/db";

const initialState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      console.log("added");
      state.favorites = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
