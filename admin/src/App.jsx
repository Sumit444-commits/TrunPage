import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppLayout from "./components/Layout/AppLayout";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Pages from "./pages/index";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Pages.Login />
            </PublicRoute>
          }
        />

        {/* Private Routes with layout */}
        <Route
          path="/"
          element={
            <AppLayout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          }
        >
          <Route element={<PrivateRoute />}>
            <Route index element={<Pages.Overview />} />
            <Route path="account" element={<Pages.Account />} />
            <Route path="logout" element={<Pages.Logout />} />
            <Route path="customers" element={<Pages.Customers />} />
            <Route path="customers/edit/:id" element={<Pages.CustomerEdit />} />
            <Route path="books" element={<Pages.Services />} />
            <Route path="contacts" element={<Pages.Contacts />} />
            <Route path="sales" element={<Pages.Sales />} />
            <Route path="sale/details/:id" element={<Pages.SaleDetailPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Pages.Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
