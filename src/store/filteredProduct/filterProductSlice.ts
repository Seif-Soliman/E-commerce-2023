import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../product/initialState";
import { fetchProduct } from "./thunk";

const filterProductSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    updateQuantityFilterProduct: (
      state,
      action: PayloadAction<{ [id: string]: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.quantity[id] = quantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMsg = "";
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.error.message ?? "";
    });
  },
});

export { fetchProduct };
export const { updateQuantityFilterProduct } = filterProductSlice.actions;

export default filterProductSlice.reducer;
