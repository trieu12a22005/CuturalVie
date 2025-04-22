import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  region: null,
  currentGame: 0,
};
const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setGame: (state, action) => {
      state.currentGame = action.payload;
    },
  },
});

export const { setGame,setRegion} = regionSlice.actions;
export default regionSlice.reducer;
