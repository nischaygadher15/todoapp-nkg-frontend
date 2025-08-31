import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: {
    firstname: "",
    lastname: "",
    useremail: "",
    username: "",
    password: "",
    cnfpassword: "",
    iagreewithterms: "",
    createdAt: "",
    updatedAt: "",
    __v: "",
    _id: "",
  },
  auth: {
    isAuthenticated: false,
  },
  loginLoading: false,
};

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    setAuth: (state, action) => {
      state.auth.isAuthenticated = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
  },
});

export const { setUser, setAuth, setLoginLoading } = userSlice.actions;

export default userSlice.reducer;
