import { CheckoutState } from "./cartTypes";

interface CartState {
  items: { [productID: string]: number };
  checkoutState: CheckoutState;
  errorMsg: string;
}

export const initialState: CartState = {
  items: {},
  checkoutState: "Completed",
  errorMsg: "Empty Cart",
};
