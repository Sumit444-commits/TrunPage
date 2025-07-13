import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Pages from "./pages/index.js";
import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/profile" element={<Pages.Profile />} />
        <Route path="/profile/edit" element={<Pages.EditProfile />} />
        <Route path="/logout" element={<Pages.Logout />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/contact" element={<Pages.Contact />} />
        <Route path="/shop" element={<Pages.Shop />} />
        <Route path="/shop/:id" element={<Pages.SaleDetailPage />} />
        <Route path="/books" element={<Pages.Books />} />
        <Route
          path="/books/book/buy/:userId/:bookId"
          element={<Pages.BuyingPage />}
        />
        <Route path="*" element={<Pages.Error />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
