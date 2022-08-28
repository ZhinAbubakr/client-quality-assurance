import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Navigate,
  // useLocation, useNavigate
} from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  console.log(auth?.user?.role_ids);
  // const location = useLocation();
  // const auther = useSelector((state) => state.auth.isAuthenticated);

  if (!auth?.user) return <LinearProgress />

  const user = auth?.user?.role_ids?.find((item) => item === 1);

  if (user) return children;
  else return <Navigate to="/403" replace={true} />;
};
export default RequireAdmin;
