import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  theme: "light",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.status = action.payload;
    },
    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { userLoggedIn, toggleTheme } = commonSlice.actions;
export default commonSlice.reducer;
