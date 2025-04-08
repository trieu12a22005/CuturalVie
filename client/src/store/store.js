import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./countSlice";

const store = configureStore({
  reducer: {
     count: countReducer
  }
});
export default store