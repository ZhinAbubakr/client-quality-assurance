import React from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { useState } from "react";
import { loginSchema, validateUser } from "../../Validations/Validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  // const [newUser,setNewUser] = useState([]);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/users",
        data: {
          user: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
          },
        },
      });

      console.log(response.data.data.attributes);
      // dispatch(signUp(response.data.data.attributes));
      // dispatch(setToken(response.data.data.attributes.token));
      //navigate("/questions");
    } catch (error) {
      console.log("error Signing Up");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };
      console.log(user);
      const isValid = await validateUser(user, loginSchema);

      console.log("isValid", isValid);

      // TODO: display validation errors
      if (!isValid)
        return toast.error("wrong email or password!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      await signup();
      navigate("/questions");
    } catch (error) {
      console.log("error");
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
            Sign Up
          </Typography>

          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="first name"
                  label="First Name"
                  name="first name"
                  autoComplete="given-name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last name"
                  label="Last Name"
                  name="last name"
                  autoComplete="family-name"
                  autoFocus
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Link to="/login" variant="body2">
                  Don't have an account? Sign In
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN UP
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer
        theme="colored"
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
    </div>
  );
}
