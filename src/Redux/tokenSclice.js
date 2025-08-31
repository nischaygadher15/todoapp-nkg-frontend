import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isRefreshing: false,
};

const tokenSlice = createSlice({
  name: "tokenBucket",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const { updateToken, setRefreshing } = tokenSlice.actions;

export default tokenSlice.reducer;
