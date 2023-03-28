import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../data/products";

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInactive: (state) => {
      state.editing = {};
    },
  },
});

export default productsSlice.reducer;
export const { editActive, editInactive } = productsSlice.actions;
