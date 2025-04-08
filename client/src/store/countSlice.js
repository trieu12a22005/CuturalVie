import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: {
    value: 0
  },
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      state.value -= 1;
    },
    setCount: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { increase, decrease, setCount } = countSlice.actions;
export default countSlice.reducer;
