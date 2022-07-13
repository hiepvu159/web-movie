import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../services/auth";

export const registerNewUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const newUser = await registerUser(user);
      return newUser.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    error: false,
    success: false,
  },

  extraReducers: {
    [registerNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerNewUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
    },
    [registerNewUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default registerSlice.reducer;
