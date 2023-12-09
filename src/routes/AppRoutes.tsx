import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/home/Index";
import { Products } from "../pages/product/Products";
import Category from "../pages/category/Category";
import { Cart } from "../pages/cart/Cart";
import { FilteredProducts } from "../pages/filterProduct/FilteredProducts";
import ErrorPage from "../pages/errorPage/ErrorPage";
import App from "../App";
import Signup from "../components/authentication/Signup";

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
        element: <Category />, //component page
      },
      {
        path: "cart",
        element: <Cart />, //cart page
      },
      {
        path: "signup",
        element: <Signup />, //cart page
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
