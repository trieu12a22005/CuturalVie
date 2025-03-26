import { configureStore } from '@reduxjs/toolkit';
import quizzReducer from './quizz';

const store = configureStore({
  reducer: {
    quizz: quizzReducer,
  },
});

export default store;
