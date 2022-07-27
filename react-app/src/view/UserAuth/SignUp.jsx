import React from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUp() {
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

          <Box component="form" onValidat sx={{ mt: 1 }}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <Link to="/login" variant="body2" fullWidth>
                  Don't have an account? Sign In
                </Link>
              </Grid>
            </Grid>

            <Link to="/" variant="body2">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
