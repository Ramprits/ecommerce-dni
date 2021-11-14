import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { ENV } from "constants/helper";

const namespace = "auth";

export const authAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});

export const loginUser = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${ENV.dev}/auth/local`, user);
    return { ...data.user, jwt: data.jwt };
  } catch (error) {
    return rejectWithValue(error);
  }
});
const authSlice = createSlice({
  name: namespace,
  initialState: authAdapter.getInitialState({
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
  }),
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
