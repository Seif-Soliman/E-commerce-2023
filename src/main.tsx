import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
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
