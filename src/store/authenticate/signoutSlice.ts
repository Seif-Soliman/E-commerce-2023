import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signIn, signOut, signup } from "./thunk"; // Import signOut thunk
// import { UserType } from "./UserType";
import { initialState } from "./initialState";
import { UserType } from "./UserType";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null; // Clear the currentUser upon sign-out
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.errorMsg = "";
        state.currentUser = action.payload;
        console.log("User signed up:", state.currentUser);
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.errorMsg = "";
        state.currentUser = action.payload;
        console.log("User signed in:", state.currentUser);
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.errorMsg = "";
        state.currentUser = null;
        state.isLoggedin = false;
        console.log("User signed out");
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

export const { clearCurrentUser } = authSlice.actions;
export default authSlice.reducer;
