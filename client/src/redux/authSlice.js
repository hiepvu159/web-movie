import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/login`, user);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    isLoggedIn: false,
    success: false,
    error: false,
  },
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.success = false;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.success = true;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.isLoggedIn = false;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
