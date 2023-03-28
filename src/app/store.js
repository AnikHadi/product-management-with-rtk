import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
