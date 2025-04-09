import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? children : <Navigate to="/login" replace />;
};

export const PublicRoute = ({children}) => {
  const accessToken = localStorage.getItem('accessToken'); 
  console.log(accessToken);
  return accessToken ? <Navigate to="/" replace /> : children;
};


export default ProtectedRoute;
