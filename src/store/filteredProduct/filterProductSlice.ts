import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../product/initialState";
import { fetchProduct } from "./thunk";

const filterProductSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    updateQuantityFilterProduct: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.quantity = { ...state.quantity, [id]: quantity };
    },

    // updateQuantityFilterProduct: (
    //   state,
    //   action: PayloadAction<{ [id: string]: number }>
    // ) => {
    //   const { id, quantity } = action.payload;
    //   state.quantity[id] = quantity;
    //   const productIndex = state.products.findIndex((prod) => prod.id === id);
    //   if (productIndex !== -1) {
    //     state.products[productIndex].max_quantity = quantity;
    //   }
    // },
  },
  extraReducers: (builder) => {
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
export const { updateQuantityFilterProduct } = filterProductSlice.actions;

export default filterProductSlice.reducer;
