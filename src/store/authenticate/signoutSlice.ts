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

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// interface SignoutState {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: SignoutState = {
//   status: "idle",
//   error: null,
// };

// export const signout = createAsyncThunk("users/signout", async () => {
//   const response = await axios.delete("http://localhost:3000/users");
//   return response.data;
// });

// // Define the slice
// const signoutSlice = createSlice({
//   name: "signout",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signout.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(signout.fulfilled, (state) => {
//         state.status = "succeeded";
//         state.error = "";
//       })
//       .addCase(signout.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message ?? "";
//       });
//   },
// });

// export default signoutSlice.reducer;
