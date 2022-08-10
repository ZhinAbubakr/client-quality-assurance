import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setToken, signIn } from "../../store/auth";
import axiosInstance, { setAxiosToken } from "../../axios";
import { base } from "../../api";
import { loginSchema, validateUser } from "../../Validations/Validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const login = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/auth/login",
        data: {
          email: inputEmail,
          password: password,
        },
      });

      setAxiosToken(response?.data?.data?.attributes?.token);
      dispatch(setToken(response?.data?.data?.attributes?.token));
      getUser();
      console.log(response.data.data.attributes.token);
    } catch (error) {
      console.log("error authentication");
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/auth/get-user-info",
      });
      dispatch(signIn(data.data.attributes));
      // setAdmin(data);
      // console.log(admin?.data?.attributes);
    } catch (errro) {
      console.log("not successful");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) dispatch(setToken(token));
  // }, []);

  useEffect(() => {
    if (auth.isAuthenticated)
      navigate(location?.state?.from?.pathname || "/questions");
  }, [auth.isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        email: inputEmail,
        password: password,
      };
      console.log(user);
      const isValid = await validateUser(user, loginSchema);

      console.log("isValid", isValid);

      // TODO: display validation errors
      if (!isValid)
        return toast.error("🦄 Wow so easy!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      login();
    } catch (error) {
      console.log("error");
      console.log("error logging in");
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>{" "}
          <form onSubmit={handleSubmit}>
            <Box component="div" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
              <br />
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
