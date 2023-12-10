import { ReactElement } from "react";
import LoadingAnimation from "./loadingAnitmation";
import ErrorAnimation from "./errorAnimation";

type LoadingProps = {
  children: ReactElement;
  loading: boolean;
  error?: string | null;
};

export function Loading({ children, loading, error }: LoadingProps) {
  if (loading === true) {
    return <LoadingAnimation />;
  }

  if (error && error !== null) {
    return <ErrorAnimation />;
  }

  return <>{children}</>;
}