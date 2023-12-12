/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./thunk";
import { initialState } from "./initialState";

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
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

// export const { recievedCategory } = categorySlice.actions;
export default categorySlice.reducer;
