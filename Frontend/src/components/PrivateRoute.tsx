import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem("AUTH_TOKEN"); // Verifica si hay un accessToken

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
}
