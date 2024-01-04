import { useEffect, ComponentType } from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";

const withGuard = (WrappedComponent: ComponentType) => {
  const WithGuardWrapper = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [isLoggedIn, navigate]);
    // console.log("withGuard");

    return isLoggedIn ? <WrappedComponent /> : null;
  };

  return WithGuardWrapper;
};

export default withGuard;
