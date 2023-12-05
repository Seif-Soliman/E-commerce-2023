import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "filterProduct/fetchProduct",
  async (cat_prefix: string) => {
    const response = await axios.get(
      `http://localhost:3000/items?cat_prefix=${cat_prefix}`
    );
    return response.data;
  }
);
