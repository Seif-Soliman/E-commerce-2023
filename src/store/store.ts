import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import filterproduct from "./filteredProduct/filterProductSlice";
import categoryReducer from "./category/categorySlice";
import signupReducer from "./authenticate/signupSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
    filterproduct,
    signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
