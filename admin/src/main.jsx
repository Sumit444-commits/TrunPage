import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoreProvider } from "./context/Store.jsx";
import {Bounce, ToastContainer} from "react-toastify"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <App />
    </StoreProvider>
  </StrictMode>
);
