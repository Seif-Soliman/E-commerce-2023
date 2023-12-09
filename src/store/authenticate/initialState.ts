import { UserType } from "./UserType";

interface SignUpState {
  users: { [id: string]: UserType };
  loading: boolean;
  errorMsg: string | null;
}

export const initialState: SignUpState = {
  users: {},
  loading: true,
  errorMsg: null,
};
