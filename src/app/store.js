import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/authentication/authSlice";
import { authApi } from "services/auth-services";
import { supportApi } from "services/support-service";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(supportApi.middleware),
});
