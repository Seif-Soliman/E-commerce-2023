import { ReactNode } from "react";
// import { useAppSelector } from "../../store/hooks";

type LoadingProps = {
  children?: ReactNode;
  loading: boolean;
  error: string | null;
};

export function Loading({ children, loading, error }: LoadingProps) {
  // const productFetchState = useAppSelector(
  //   (state) => state.product.productFetchState
  // );

  // const errorMsg = useAppSelector((state) => state.product.errorMsg);

  if (loading === true) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return <>{children}</>;
}
