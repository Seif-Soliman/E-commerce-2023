export interface ProductType {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  max_quantity: number;
}

export type ProductFetchState = "Loading" | "Completed" | "Error";
