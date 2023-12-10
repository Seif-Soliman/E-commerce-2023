import { CheckoutState } from "./cartTypes";

export interface CartState {
  items: { [productID: string]: number };
  checkoutState: CheckoutState;
  errorMsg: string;
}

export const initialState: CartState = {
  items: {},
  checkoutState: "Completed",
  errorMsg: "Empty Cart",
};
