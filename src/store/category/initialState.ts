import type { CategoryType } from "./categoryTypes";
import type { ProductType } from "../product/productTypes";

interface CategoryState {
  category: CategoryType[];
  filteredProducts: ProductType[];
  loading: boolean;
  errorMsg: string;
}

export const initialState: CategoryState = {
  category: [],
  filteredProducts: [],
  loading: true,
  errorMsg: "Failed to fetch categories",
};
