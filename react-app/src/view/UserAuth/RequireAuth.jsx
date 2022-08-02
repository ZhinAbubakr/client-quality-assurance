import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();

  if (auth) return children;
  else return <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;