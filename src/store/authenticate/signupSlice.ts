import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "./thunk";
import { UserType } from "./UserType";
import { initialState } from "./initialState";

const signupSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.isLoggedin = false;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ [id: string]: UserType }>) => {
          state.loading = false;
          state.errorMsg = "";
          state.isLoggedin = true;
          state.users = action.payload;
          console.log(state.users);
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedin = false;
        state.errorMsg = action.error.message ?? "";
      });
  },
});

export default signupSlice.reducer;
