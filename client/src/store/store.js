import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import cardReducer from "./Card";
import puzzleReducer from "./puzzle";
import countReducer from "./countSlice";
import regionReducer from "./Region";
import questionReducer from "./questionSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage

// Gộp tất cả reducers lại
const rootReducer = combineReducers({
  count: countReducer,
  card: cardReducer,
  puzzle: puzzleReducer,
  region: regionReducer,
  question: questionReducer
});

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  storage,
 whitelist: ["region", "count", "card", "puzzle","question"], // nơi muốn lưu các slice và local storage
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Khởi tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action đặc biệt của redux-persist để tránh warning
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export persistor để dùng trong <PersistGate>
export const persistor = persistStore(store);
