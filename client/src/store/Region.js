import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  region: 1,
  game: [],
  currentGame: null,
  text: ""
};
const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setCurrentGame(state,action) {
      state.currentGame=action.payload;
    },
    setGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { setGame,setRegion,setCurrentGame,setText} = regionSlice.actions;
export default regionSlice.reducer;
