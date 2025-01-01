import { Navigate, Outlet } from "react-router";

function UnAuthLayout() {
  const isAuthenticated = localStorage.getItem("access_token");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
}

export default UnAuthLayout;
