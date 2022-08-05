import { createSlice } from "@reduxjs/toolkit";
import { setAxiosToken } from "../axios";
// Slice
const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", state.token);
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      setAxiosToken(null);
    },
  },
});

export default slice.reducer;

export const { signIn, signOut, setToken } = slice.actions;
