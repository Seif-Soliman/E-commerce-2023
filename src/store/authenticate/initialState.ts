import { User } from "./userT";

export interface UserState {
  isLoading: boolean;
  errorMsg: boolean;
  isLoggedIn: boolean;
  currentUser: User | null;
  errorSignUp: string;
  errorSignIn: string;
  editEmailMode: boolean;
  newEmail: string;
}

export const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  errorMsg: false,
  errorSignUp: "",
  errorSignIn: "",
  currentUser: null,
  editEmailMode: false,
  newEmail: "",
};
