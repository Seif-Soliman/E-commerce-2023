/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "./thunk";
import type { ProductType } from "../product/productTypes";
import { fetchProducts } from "../product/thunk";
import { initialState } from "./initialState";
// import { recievedProducts } from "../product/productSlice";

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMsg = "";
        if (action.payload) {
          action.payload.forEach((category) => {
            state.category[category.id] = category;
          });
        }
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.filteredProducts = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

// export const { recievedCategory } = categorySlice.actions;
export default categorySlice.reducer;
