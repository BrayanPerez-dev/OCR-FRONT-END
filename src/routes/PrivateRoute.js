import { useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

const PrivateRoute = () => {
  const location = useLocation();
  const [pathName, setPathName] = useState("");
   
  useEffect(() => {
    const { pathname } = location;
    setPathName(pathname);
  }, [location]);
  console.log(pathName)
  const data = AuthService.gerCurrentUser();
  if (!data?.token) {
    return <Navigate to="/" replace state={{ from: pathName }} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
