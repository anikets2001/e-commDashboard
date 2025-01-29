import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/common/commonSlice";

export const store = configureStore({
  reducer: {
    loggedIn: loginReducer,
  },
});
