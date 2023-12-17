import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductType } from "../product/productTypes";

interface CartItem {
  [productId: string]: number;
}

interface ReceivedItem extends ProductType {}

interface Cart {
  items: CartItem;
  checkoutState: string;
  errorMsg: string;
  receivedItems: ReceivedItem[];
}

interface Order {
  orders: { quantity: number; product: ProductType }[];
  id: number;
  userId: number;
}

interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  orders: {},
  status: "idle",
  error: null,
};

const updateOrder = createAsyncThunk<
  Order[], // Update the return type to include userId
  { cart: Cart; userId: number },
  { rejectValue: string }
>("orders/update", async ({ cart, userId }, { rejectWithValue }) => {
  try {
    const { items, receivedItems } = cart;
    const orders: Order[] = [];
    let existingMaxId = Math.max(
      ...initialState.orders.map((order) => order.id),
      0
    ); // Get the maximum ID from existing orders or default to 0 if there are no existing orders

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
        orders: [{ quantity, product: { ...product, max_quantity: quantity } }],
        userId,
        id: ++existingMaxId, // Assign the ID based on the existing maximum ID
      });
    }

    const response = await axios.post<Order[]>(
      "http://localhost:3000/orders",
      orders
    );

    return response.data;
  } catch (error) {
    console.error("Error updating orders:", error);
    return rejectWithValue("Failed to update orders");
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Additional reducers can be defined here if needed
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

export { updateOrder };
export default ordersSlice.reducer;
