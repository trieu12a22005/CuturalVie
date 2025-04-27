import { createSlice} from "@reduxjs/toolkit";

let initialState = {
  current: 0,
  seconds: 60,
  progress: [],
  puzzles: [],
  modal: "",
};

const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    getPuzzle(state, action) {
      state.puzzles = action.payload;
     if (!state.current) state.progress = Array.from({ length: action.payload.length }, () => undefined);
    },
    increasePuzzle(state) {
       state.current=state.current+1;
       state.modal="";
    },
    resetPuzzle() {
      return initialState;
    },
    handleWin(state,action) {
      state.modal=action.payload;
      if (action.payload=="win") {
        state.progress[state.current]=true
      } else {
        state.progress[state.current]=false
      }
   },
   CountDown(state,action) {
    let timer=action.payload;
     if (state.seconds==1) {
      state.modal="timeout";
      state.progress[state.current]=false
      clearInterval(timer)
    }
    if (state.seconds>0) state.seconds=state.seconds-1;
   },
}});

export const { getPuzzle,handleWin,CountDown ,resetPuzzle,increasePuzzle} = puzzleSlice.actions;
export default puzzleSlice.reducer;
