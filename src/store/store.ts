import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import cartReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import filterproduct from "./filteredProduct/filterProductSlice";
import categoryReducer from "./category/categorySlice";
import signupReducer from "./authenticate/signupSlice";
import signinReducer from "./authenticate/signinSlice";
import signoutReducer from "./authenticate/signoutSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
  filterproduct,
  signupReducer,
  signinReducer,
  signoutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
