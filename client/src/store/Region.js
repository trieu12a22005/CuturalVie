import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  region: null,
  game: [],
};
const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { setGame,setRegion} = regionSlice.actions;
export default regionSlice.reducer;
