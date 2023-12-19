import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateOrder } from "./thunk";
import { initialState } from "./initialState";
import { Order } from "./orderT";

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateOrder.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.status = "succeeded";
          state.orders = action.payload;
        }
      )
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setOrders } = ordersSlice.actions;
export { updateOrder };
export default ordersSlice.reducer;
