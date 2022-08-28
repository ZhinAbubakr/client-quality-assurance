import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance, { setAxiosToken } from "../../axios";
import { base } from "../../api";
import { setToken, signIn, setIsAuthenticationLoading } from "../../store/auth";
import { LinearProgress } from '@mui/material'


const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthenticationLoading } = useSelector((state) => state.auth);
  let location = useLocation();

  const getSelf = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/auth/get-user-info",
      });
      dispatch(signIn(data.data.attributes));
      // setAdmin(data);
      console.log(data?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAxiosToken(token);
      dispatch(setToken(token));
    } else {
      setAxiosToken();
    }
    dispatch(setIsAuthenticationLoading(false))
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
        getSelf()
    }
}, [isAuthenticated])

 // TODO: Create a loding page component to display
 if (isAuthenticationLoading) return <LinearProgress />

 if (isAuthenticated) return children
  else return <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
