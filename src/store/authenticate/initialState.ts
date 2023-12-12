import { User } from "./userT";

export interface userState {
  isLoading: boolean;
  users: { [id: string]: User };
  errorMsg: boolean;
  isLoggedIn: boolean;
  accessToken: null;
  currentUser: User | null;
  errorSignUp: string;
  errorSignIn: string;
  correctSignIn: string | User[];
}

export const initialState: userState = {
  isLoggedIn: false,
  accessToken: null,
  isLoading: false,
  errorMsg: false,
  errorSignUp: "",
  errorSignIn: "",
  correctSignIn: "",
  currentUser: null,
  users: {},
};
