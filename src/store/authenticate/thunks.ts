import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./userT";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData: {
    email: string;
    password: string;
    userName: string;
    mobile: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/",
        userData
      );
      return response.data as User; // Assuming the response is a single User object
    } catch (error) {
      throw new Error("Invalid signup");
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3000/signin/", {
        email,
        password,
      });
      return response.data as User;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }
);

export const signOut = createAsyncThunk("user/signOut", async () => {
  localStorage.removeItem("user");
});
