import type { ProductType } from "./productTypes";

interface ProductState {
  products: ProductType[];
  loading: boolean;
  errorMsg: string;
  quantity: { [id: string]: number };
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}

export const initialState: ProductState = {
  products: [],
  loading: true,
  errorMsg: "Failed to fetch products",
  quantity: {},
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 12,
};
