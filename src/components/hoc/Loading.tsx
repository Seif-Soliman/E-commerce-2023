import { ReactElement } from "react";
import LoadingAnimation from "./loadingAnitmation";

type LoadingProps = {
  children: ReactElement;
  loading: boolean;
  error?: string;
};

export function Loading({ children, loading, error }: LoadingProps) {
  if (loading === true) {
    return <LoadingAnimation />;
  }

  if (error && error !== null) {
    return <div>Error...</div>;
  }

  return <>{children}</>;
}
