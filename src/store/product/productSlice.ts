import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "./productTypes";
import { initialState } from "./initialState";
import { fetchProducts } from "./thunk";

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    recievedProducts(state, action: PayloadAction<ProductType[]>) {
      const products = action.payload;
      if (products && Array.isArray(products)) {
        products.forEach((product) => {
          state.products[product.id] = product; //converting product array into object
        });
      }
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

export const { recievedProducts } = productSlice.actions;
export default productSlice.reducer;
