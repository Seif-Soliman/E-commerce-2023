import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/home/Index";
import { Products } from "../pages/product/Products";
import Category from "../pages/category/Category";
import { Cart } from "../pages/cart/Cart";
import { FilteredProducts } from "../pages/filterProduct/FilteredProducts";
import ErrorPage from "../pages/errorPage/ErrorPage";
import App from "../App";
import Signup from "../pages/authentication/Signup";
import Signin from "../pages/authentication/Signin";
import Profile from "../pages/profile/Profile";
import UserInfo from "../pages/profile/userInfo";
import OrderHistory from "../pages/profile/orderHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //home
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "products",
        element: <Products />, //product page
      },
      {
        path: "categories",
        element: <Category />, //Category page
      },
      {
        path: "profile",
        element: <Profile />, //Profile page
        children: [
          {
            path: "user-information",
            element: <UserInfo />,
          },
          {
            path: "order-history",
            element: <OrderHistory />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />, //cart page
      },
      {
        path: "signup",
        element: <Signup />, //Sign in page
      },
      {
        path: "signin",
        element: <Signin />, //Sign up page
      },
      {
        path: "categories/:categoryPrefix",
        element: <FilteredProducts />, //FilteredProducts page
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
