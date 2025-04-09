import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './Card';
import puzzleReducer from './puzzle'
import countReducer from './countSlice'
const store = configureStore({
  reducer: {
    count: countReducer,
    card: cardReducer,
    puzzle: puzzleReducer
  },
});
export default store