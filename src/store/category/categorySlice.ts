/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "./thunk";
// import type { CategoryType } from "./categoryTypes";
import type { ProductType } from "../product/productTypes";
import { fetchProducts } from "../product/thunk";
import { initialState } from "./initialState";
// import { recievedProducts } from "../product/productSlice";

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // recievedCategory(state, action: PayloadAction<CategoryType[]>) {
    //   const categories = action.payload;
    //   if (categories && Array.isArray(categories)) {
    //     categories.forEach((category) => {
    //       state.category[category.id] = category; //converting category array into object
    //     });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMsg = "";
        // state.category = action.payload;
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
