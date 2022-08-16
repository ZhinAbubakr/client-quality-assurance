import React from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Tooltip,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { useState } from "react";
import { loginSchema, validateUser } from "../../Validations/Validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const options = ["English", "Kurdish"];
  const { t, i18n } = useTranslation(); //useTranslation is a hook that returns the current language and the function to change the language

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    // setLang(e.target.value);
    // eslint-disable-next-line default-case
    switch (e.target.value) {
      case 0:
        i18n.changeLanguage("eng"); //change language to english if the user clicks on english language icon
        break;
      case 1:
        i18n.changeLanguage("krd");
        break;
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Tooltip title="Language">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
              sx={{
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                ml: 2,
                float: "right",
                m: 4,
              }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
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
                {t("signUp.signup")}
              </Typography>

              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="first name"
                      label={t("signUp.firstName")}
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
                      label={t("signUp.lastName")}
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
                      label={t("signUp.email")}
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
                      label={t("signUp.password")}
                      name="password"
                      autoComplete="password"
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Link to="/login" variant="body2">
                      {t("signUp.notSingup")}
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("signUp.signup")}
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>

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
      <Menu
        // value={lang}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((option, index) => (
          <MenuItem key={option} value={index} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
