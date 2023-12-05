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
      console.log("oending");
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      console.log(state.products);
      console.log("state.products");
      console.log(action.payload);
      state.errorMsg = null;
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      console.log("rejected");
      state.loading = false;
      state.errorMsg = action.error.message ?? "";
    });
  },
});

export { fetchProduct };
// export const { recievedProduct } = filterProductSlice.actions;
export default filterProductSlice.reducer;
