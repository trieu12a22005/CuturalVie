import { configureStore } from '@reduxjs/toolkit';
import quizzReducer from './quizz';
import cardReducer from './Card';
import puzzleReducer from './puzzle'
const store = configureStore({
  reducer: {
    quizz: quizzReducer,
    card: cardReducer,
    puzzle: puzzleReducer
  },
});

export default store;
