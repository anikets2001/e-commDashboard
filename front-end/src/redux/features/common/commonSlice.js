import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

export const loginSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { userLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
