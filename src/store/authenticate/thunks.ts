import {
  AnyAction,
  // Dispatch,
  ThunkDispatch,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./userT";
import { updateEmail } from "./authSlice";
import { RootState } from "../store";

interface UpdateEmailPayload {
  userId: number;
  email: string;
}

export const updateUserEmailInData = async ({
  userId,
  email,
}: UpdateEmailPayload) => {
  try {
    const updatedData = {
      email,
    };

    const response = await axios.patch<User>(
      `http://localhost:3000/users/${userId}`,
      updatedData
    );

    console.log("Response from updateUserEmailInData:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating user email in data:", error);
    throw new Error("Error updating user email in data");
  }
};

export const updateUserEmailThunk = createAsyncThunk<User, UpdateEmailPayload>(
  "auth/updateUserEmail",
  async ({ userId, email }) => {
    try {
      const updatedUserData = await updateUserEmailInData({ userId, email });

      return updatedUserData;
    } catch (error) {
      throw new Error(error as string);
    }
  }
);

export const updateEmailAndData = (newEmail: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, AnyAction>,
    getState: () => RootState
  ) => {
    try {
      dispatch(updateEmail(newEmail));

      dispatch({ type: "UPDATE_EMAIL", payload: newEmail });

      const currentUser = getState().auth.currentUser;
      const userId = currentUser?.id;

      if (userId) {
        await dispatch(
          updateUserEmailThunk({
            userId,
            email: newEmail,
          })
        );
      }
    } catch (error) {
      console.error("Error updating email and data:", error);
    }
  };
};

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
