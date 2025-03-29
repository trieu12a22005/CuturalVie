import { createSlice, current } from "@reduxjs/toolkit";

let initialState = {
  current: 0,
  selected: null,
  progress: [undefined,undefined,undefined],
  questions: [],
  modal: "",
};

const quizzSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    getQuizz(state, action) {
      state.questions = action.payload;
      state.progress = Array.from({ length: action.payload.length }, () => undefined);
    },
    selectAns(state, action) {
      state.selected = action.payload == state.selected ? null : action.payload;
    },
    submitAns(state) {
      let audio=new Audio();
      if (state.questions[state.current].correctAnswer == state.selected) {
        state.modal = "correct";
        audio.src = "/sound/correct.mp3";
        console.log(state.progress);
        state.progress[state.current]=true
      } else {
        state.modal = "wrong";
        audio.src = "/sound/wrong.mp3";
        state.progress[state.current]=false
      }
      audio.play();
    },
  },
});

export const { getQuizz, selectAns, submitAns } = quizzSlice.actions;
export default quizzSlice.reducer;
