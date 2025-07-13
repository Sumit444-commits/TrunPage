import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../context/Store";

const PrivateRoute = () => {
  const { isLoggedIn } = useStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
