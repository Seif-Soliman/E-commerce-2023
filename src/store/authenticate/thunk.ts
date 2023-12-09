// src/store/authenticate/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "users/signup",
  async (user: {
    email: string;
    password: string;
    userName: string;
    mobile: string;
  }) => {
    const response = await axios.post("http://localhost:3000/users", user);
    return response.data;
  }
);
