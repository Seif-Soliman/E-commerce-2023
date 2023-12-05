import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { checkout } from "../../app/api";

export const checkoutCart = createAsyncThunk<
  { success: boolean },
  undefined,
  { state: RootState }
>("cart/checkout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const items = state.cart.items;
  const res = await checkout(items);
  return res;
});
