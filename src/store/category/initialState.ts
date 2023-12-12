import type { CategoryType } from "./categoryTypes";

interface CategoryState {
  category: CategoryType[];
  loading: boolean;
  errorMsg: string;
}

export const initialState: CategoryState = {
  category: [],
  loading: true,
  errorMsg: "Failed to fetch categories",
};
