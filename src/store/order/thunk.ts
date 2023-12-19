import axios from "axios";
import { ProductType } from "../product/productTypes";
import { CartState } from "../cart/initialState";
import { setOrders } from "./orderSlice";
import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "./orderT";

export const fetchOrdersByUserId =
  (userId: number) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/orders?userId=${userId}`
      );
      const orders = response.data;
      dispatch(setOrders(orders));
    } catch (error) {
      console.error("Error fetching orders by id:", error);
    }
  };

export const updateOrder = createAsyncThunk<
  Order[],
  { cart: CartState; userId: number },
  { rejectValue: string }
>("orders/update", async ({ cart, userId }, { rejectWithValue }) => {
  try {
    const { items, receivedItems } = cart;
    const orders: { quantity: number; product: ProductType }[] = [];

    for (const productId in items) {
      const quantity = items[productId];
      const parsedProductId = parseInt(productId, 10);
      const product = receivedItems.find((item) => item.id === parsedProductId);

      if (!product) {
        console.error(
          `Product with ID ${productId} not found in receivedItems`
        );
        return rejectWithValue("Failed to update orders - Product not found");
      }

      orders.push({
        quantity,
        product: { ...product, max_quantity: quantity },
      });
    }

    const orderData = {
      orders,
      userId,
    };

    const response = await axios.post(
      "http://localhost:3000/orders",
      orderData
    );

    return [response.data];
  } catch (error) {
    console.error("Error updating orders:", error);
    return rejectWithValue("Failed to update orders");
  }
});
