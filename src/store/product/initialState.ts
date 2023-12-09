import type { ProductType } from "./productTypes";

interface ProductState {
  products: { [id: string]: ProductType };
  loading: boolean;
  errorMsg: string | null;
}

export const initialState: ProductState = {
  products: {},
  loading: true,
  errorMsg: null,
};
