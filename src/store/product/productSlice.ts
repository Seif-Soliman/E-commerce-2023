import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "./productTypes";
import { initialState } from "./initialState";
import { fetchProduct, fetchProducts } from "./thunk";

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    receivedProducts(state, action: PayloadAction<ProductType[]>) {
      state.products = action.payload.filter(Boolean); // Assign the payload directly to products array
    },
    updateQuantityFilterProduct: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.quantity = { ...state.quantity, [id]: quantity };
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
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
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMsg = "";
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

export { fetchProduct };
export const {
  receivedProducts,
  updateQuantityFilterProduct,
  setSearchQuery,
  setCurrentPage,
} = productSlice.actions;
export default productSlice.reducer;
