import type { ProductType } from "./productTypes";

interface ProductState {
  products: ProductType[];
  loading: boolean;
  errorMsg: string;
  quantity: { [id: string]: number };
  searchQuery: string;
}

export const initialState: ProductState = {
  products: [],
  loading: true,
  errorMsg: "Failed to fetch products",
  quantity: {},
  searchQuery: "",
};
