import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { checkout } from "./api";
import axios from "axios";

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

export const itemInCart = createAsyncThunk(
  "cart/cartProduct",
  async (id: string) => {
    const response = await axios.get(`http://localhost:3000/items?id=${id}`);
    return response.data;
  }
);
