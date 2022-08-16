import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance, { setAxiosToken } from "../../axios";
import { base } from "../../api";
import { setToken, signIn } from "../../store/auth";
const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();

  const getUser = async () => {
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

    if (auth) getUser();
  }, []);

  if (auth) return children;
  else return <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
