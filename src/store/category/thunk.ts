import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CategoryType } from "./categoryTypes";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get("http://localhost:3000/category");
    return response.data as CategoryType[];
  }
);
