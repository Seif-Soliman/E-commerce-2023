import type { ProductType } from "./productTypes";

interface ProductState {
  products: { [id: string]: ProductType };
  loading: boolean;
  errorMsg: string;
  quantity: { [id: string]: number };
}

export const initialState: ProductState = {
  products: {},
  loading: true,
  errorMsg: "Failed to fetch products",
  quantity: {},
};
