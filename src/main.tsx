import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Products } from "./pages/product/Products";
import Category from "./pages/category/Category";
import { Cart } from "./pages/cart/Cart";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { FilteredProducts } from "./pages/filterProduct/FilteredProducts";
import ErrorPage from "./routes/ErrorPage";
import Index from "./routes/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ), //home
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
        path: "categories/:categoryPrefix",
        element: <FilteredProducts />, //component page
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
} else {
  console.error("Root element not found");
}
