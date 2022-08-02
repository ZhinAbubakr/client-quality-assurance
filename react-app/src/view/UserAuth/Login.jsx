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
import { signIn, signOut, setToken } from "../../store/auth";
import axios from "../../axios";
import { base } from "../../api";

export default function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log({ base });

  const login = async () => {
    try {
      const response = await axios({
        method: "post",
        url: base + "/auth/login",
        data: {
          email: inputEmail,
          password: password,
        },
      });
      // getUser();
      dispatch(setToken(response.data.data.attributes.token));
      navigate("/questions");
      console.log(response.data.data.attributes.token);
    } catch (error) {
      console.log("error authentication");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(setToken(token));
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated)
      navigate(location?.state?.from?.pathname || "/questions");
  }, [auth.isAuthenticated, location]);


  const handleSubmit = (event) => {
    event.preventDefault();
    login();
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
          </Typography>
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
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
