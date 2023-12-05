import type { ProductType } from "./productTypes";

interface ProductState {
  products: ProductType[];
  loading: boolean;
  errorMsg: string;
}

export const initialState: ProductState = {
  products: [],
  loading: true,
  errorMsg: "Failed to fetch products",
};
