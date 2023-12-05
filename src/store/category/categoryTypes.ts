export interface CategoryType {
  id: number;
  title: string;
  prefix: string;
  img: string;
}

export type CategoryFetchState = "Loading" | "Completed" | "Error";
