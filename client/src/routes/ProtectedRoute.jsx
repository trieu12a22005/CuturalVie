import { Navigate, Outlet } from "react-router-dom";
import { notifyError } from "../utils/notify";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("login", "true");
  const updatedUrl =
    location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) +
    "home?" +
    searchParams.toString();
  if (!accessToken) {
    notifyError("vui lòng đăng nhập để truy cập");
    return <Navigate to={updatedUrl} replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Navigate to="/home" replace /> : children;
};

export default ProtectedRoute;
