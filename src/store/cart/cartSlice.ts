/* eslint-disable prefer-const */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { checkoutCart } from "./thunk";
import { initialState } from "./initialState";
import { ProductType } from "../product/productTypes";

export const getQuantityById = (state: RootState, id: number) => {
  return state.cart.items[id] ?? 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductType>) {
      const id = action.payload.id;
      const quantity = action.payload.max_quantity;
      if (state.items[id] < quantity) {
        state.items[id]++;
      } else if (state.items[id] >= quantity) {
        state.items[id] = quantity;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload.toString();
      delete state.items[id];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }> // Update id type to number
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(checkoutCart.pending, (state) => {
      state.checkoutState = "Loading";
    });
    builder.addCase(
      checkoutCart.fulfilled,
      (state, action: PayloadAction<{ success: boolean }>) => {
        const { success } = action.payload;
        if (success) {
          state.checkoutState = "Completed";
          state.items = {};
        } else {
          state.checkoutState = "Error";
        }
      }
    );
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = "Error";
      state.errorMsg = action.error.message ?? "";
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0;
    for (let id in items) {
      numItems += items[id];
    }
    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.product.products,
  (items, products) => {
    let total = 0;
    for (let id in items) {
      const productId = parseInt(id);
      const quantity = items[productId];
      const product = products.find((prod) => prod.id === productId);

      if (product) {
        total += product.price * quantity;
      }
    }
    return total.toFixed(2);
  }
);

// addToCart(state, action: PayloadAction<ProductType>) {
//   const id = action.payload.id;
//   const quantity = action.payload.max_quantity;
//   if (state.items[id] < quantity) {
//     state.items[id]++;
//   } else if (state.items[id] >= quantity) {
//     state.items[id] = quantity;
//   } else {
//     state.items[id] = 1;
//   }
// },
// removeFromCart(state, action: PayloadAction<string>) {
//   delete state.items[action.payload];
// },
// updateQuantity(
//   state,
//   action: PayloadAction<{ id: string; quantity: number }>
// ) {
//   const { id, quantity } = action.payload;
//   state.items[id] = quantity;
// },
