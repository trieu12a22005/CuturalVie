import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  questionId: null,
};
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
    resetQuestionId: (state) => {
      state.questionId = null;
    },
  },
});
export const { setQuestionId, resetQuestionId } = questionSlice.actions;
export default questionSlice.reducer;
