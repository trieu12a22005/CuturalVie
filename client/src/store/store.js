import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './Card';
import puzzleReducer from './puzzle'
import countReducer from './countSlice'
import regionReducer from './Region'
const store = configureStore({
  reducer: {
    count: countReducer,
    card: cardReducer,
    puzzle: puzzleReducer,
    region: regionReducer
  },
});
export default store