export interface Order {
  orders: {
    quantity: number;
    product: {
      id: number;
      title: string;
      price: number;
      cat_prefix: string;
      img: string;
      max_quantity: number;
    };
  };
  id: number;
  userId: number;
}

export interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
