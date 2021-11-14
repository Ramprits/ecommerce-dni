import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/authentication/authSlice";
import { authApi } from "services/auth-services";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
