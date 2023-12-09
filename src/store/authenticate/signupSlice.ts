// src/store/authenticate/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "./thunk";
import { UserType } from "./UserType";

interface UserState {
  loading: boolean;
  users: { [id: string]: UserType };
}

const initialState: UserState = {
  loading: false,
  users: {},
};

const signupSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ [id: string]: UserType }>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default signupSlice.reducer;
