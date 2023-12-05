import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Products } from "./pages/product/Products";
import Category from "./pages/category/Category";
import { Cart } from "./pages/cart/Cart";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { FilteredProducts } from "./pages/filterProduct/FilteredProducts";
import Index from "./routes";
import ErrorPage from "./routes/ErrorPage";

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
        path: "filteredproducts",
        element: <FilteredProducts />, //filteredproducts page
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
