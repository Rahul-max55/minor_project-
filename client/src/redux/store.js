import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
