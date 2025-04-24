import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  region: 1,
  game: [],
  currentGame: null,
};
const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    // setCurrentGame(state,action) {
    //   state.game = action.payload;
    // }
    setGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { setGame,setRegion} = regionSlice.actions;
export default regionSlice.reducer;
