import { User } from "./userT";

export interface UserState {
  isLoading: boolean;
  users: { [id: string]: User };
  errorMsg: boolean;
  isLoggedIn: boolean;
  currentUser: User | null;
  errorSignUp: string;
  errorSignIn: string;
}

export const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  errorMsg: false,
  errorSignUp: "",
  errorSignIn: "",
  currentUser: null,
  users: {},
};
