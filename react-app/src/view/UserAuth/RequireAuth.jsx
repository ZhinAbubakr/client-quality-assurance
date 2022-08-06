import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAxiosToken } from "../../axios";

import { setToken } from "../../store/auth";
const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAxiosToken(token);
      dispatch(setToken(token));
    } else {
      setAxiosToken();
    }
  }, []);

  const auth = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();

  if (auth) return children;
  else return <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
