import { ProductType } from "../product/productTypes";
import { CheckoutState } from "./cartTypes";

export interface CartState {
  items: { [id: string]: number };
  checkoutState: CheckoutState;
  errorMsg: string;
  receivedItems: ProductType[];
}

export const initialState: CartState = {
  items: {},
  checkoutState: "Completed",
  errorMsg: "Empty Cart",
  receivedItems: [],
};
