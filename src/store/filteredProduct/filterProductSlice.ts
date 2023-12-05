import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../product/initialState";
import { fetchProduct } from "./thunk";

const filterProductSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMsg = null;
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.error.message ?? "";
    });
  },
});

export { fetchProduct };

export default filterProductSlice.reducer;
