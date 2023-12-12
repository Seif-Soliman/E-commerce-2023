import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "./productTypes";
import { initialState } from "./initialState";
import { fetchProducts } from "./thunk";

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    receivedProducts(state, action: PayloadAction<ProductType[]>) {
      state.products = action.payload.filter(Boolean); // Assign the payload directly to products array
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.loading = false;
          state.errorMsg = "";
          if (action.payload) {
            action.payload.forEach((product) => {
              state.products[product.id] = product;
            });
          }
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

export const { receivedProducts } = productSlice.actions;
export default productSlice.reducer;
