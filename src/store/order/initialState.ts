import { OrdersState } from "./orderT";

export const initialState: OrdersState = {
  orders: [],
  status: "idle",
  error: null,
};
