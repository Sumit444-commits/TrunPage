import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./store/AppContext.jsx";
import {Bounce, ToastContainer} from "react-toastify"
import "./index.css";
import App from "./App.jsx";

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
