import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn } from "./thunk"; // Create this thunk for sign-in
import { UserType } from "./UserType";
import { initialState } from "./initialState";

const signinSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.isLoggedin = false;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.errorMsg = "";
        state.currentUser = action.payload; // Assuming currentUser is updated upon successful sign-in
        state.isLoggedin = true;
        console.log("User signed in:", state.currentUser);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedin = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

export default signinSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { signin } from "./thunk";
// import { UserType } from "./UserType";
// import { initialState } from "./initialState";

// const signinSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signin.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(signin.fulfilled, (state, action: PayloadAction<UserType[]>) => {
//         state.loading = false;
//         state.errorMsg = "";
//         state.users = action.payload;
//       })
//       .addCase(signin.rejected, (state, action) => {
//         state.loading = false;
//         console.log(state.errorMsg);
//         state.errorMsg = action.error.message ?? "";
//       });
//   },
// });

// export default signinSlice.reducer;
