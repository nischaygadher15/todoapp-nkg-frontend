import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Redux/tokenSclice";
import loaderReducer from "./Redux/loaderSlice";
import userReducer from "./Redux/userSlice";

export const MyStore = configureStore({
  reducer: {
    tokenBucket: tokenReducer,
    loader: loaderReducer,
    user: userReducer,
  },
});
