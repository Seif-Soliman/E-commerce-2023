import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { UserType } from "./UserType";

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

export const signIn = createAsyncThunk(
  "auth/signin",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signin",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }
);

export const signOut = createAsyncThunk("auth/signout", async () => {
  try {
    return;
  } catch (error) {
    throw new Error("Sign-out failed");
  }
});
