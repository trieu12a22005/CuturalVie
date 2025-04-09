import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  current: 0,
  seconds: 36000,
  progress: [undefined,undefined,undefined],
  puzzles: [],
  modal: "",
};

const puzzleSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    getPuzzle(state, action) {
      state.puzzles = action.payload;
      state.progress = Array.from({ length: action.payload.length }, () => undefined);
    },
    handleWin(state,action) {
      state.modal=action.payload;
   },
   CountDown(state,action) {
    let timer=action.payload;
     if (state.seconds==1) {
      state.modal="lose";
      clearInterval(timer)
    }
    if (state.seconds>0) state.seconds=state.seconds-1;
   },
}});

export const { getPuzzle,handleWin,CountDown } = puzzleSlice.actions;
export default puzzleSlice.reducer;
