import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
  selectedProducts: [],
  selectedName: [],
  isProductAvailable: true,
  isModelShow: false,
};

const filterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedProducts = [];
      state.selectedName = [];
      state.isProductAvailable = true;
    },
    selectedProduct: (state, action) => {
      state.selectedProducts.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (pd) => pd.productName !== action.payload
      );
    },
    selectedName: (state, action) => {
      state.selectedName.push(action.payload);
    },
    isProductAvailable: (state, action) => {
      state.isProductAvailable = action.payload;
    },
    isModelShow: (state, action) => {
      state.isModelShow = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  selectedCategory,
  selectedName,
  selectedProduct,
  removeProduct,
  isProductAvailable,
  isModelShow,
} = filterSlice.actions;
