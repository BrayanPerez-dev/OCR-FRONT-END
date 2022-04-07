import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

const PrivateRoute = () => {
  const location = useLocation();
  
  const data = AuthService.gerCurrentUser();
  if (!data?.token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
