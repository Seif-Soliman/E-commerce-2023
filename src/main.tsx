import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
} else {
  console.error("Root element not found");
}

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <AppRoutes />
//   </Provider>
// );
