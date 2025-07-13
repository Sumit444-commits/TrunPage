import { useStore } from "../../context/Store";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useStore();
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
