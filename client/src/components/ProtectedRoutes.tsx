import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
