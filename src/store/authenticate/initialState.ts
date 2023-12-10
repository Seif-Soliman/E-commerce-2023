import { UserType } from "./UserType";

export interface UserState {
  loading: boolean;
  users: { [id: string]: UserType };
  errorMsg: string;
  isLoggedin: boolean;
  currentUser: UserType | null;
}

export const initialState: UserState = {
  loading: false,
  users: {},
  errorMsg: "Process failed",
  isLoggedin: true,
  currentUser: null,
};
