import { Navigate, Outlet } from "react-router";

function AuthLayout() {
  const isAuthenticated = localStorage.getItem("access_token");

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default AuthLayout;
