import { useEffect, ComponentType, ReactElement } from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";

interface WithGuardProps {}

const withGuard = (
  WrappedComponent: ComponentType
): ComponentType<WithGuardProps> => {
  const WithGuardWrapper = (): ReactElement | null => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [isLoggedIn, navigate]);
    console.log("withGuard");

    return isLoggedIn ? <WrappedComponent /> : null;
  };

  return WithGuardWrapper;
};

export default withGuard;
