import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { signIn, signOut, signUp } from "./thunks";
import { User } from "./userT";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload; // Store the single user in currentUser
        console.log(state.currentUser);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        console.log("action payload", action.payload);
        state.errorSignUp = action.payload as string;
      });

    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload; // Store the array of users
        console.log("action payload", action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        console.log("action payload", action.payload);
        state.errorSignIn = action.payload as string;
      })

      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as boolean;
      });
  },
});

export default authSlice.reducer;
