import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: {
    value: 0,
    progress: [],
  },
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    initProgress(state, action) {
      if (!state.progress.length)
        state.progress = state.progress = Array.from(
          { length: action.payload.length },
          () => undefined
        );
    },
    updateProgress(state, action) {
      state.progress[state.value] = action.payload;
    },
    decrease: (state) => {
      state.value -= 1;
    },
    setCount: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});
export const {
  increase,
  decrease,
  setCount,
  reset,
  initProgress,
  updateProgress,
} = countSlice.actions;
export default countSlice.reducer;
