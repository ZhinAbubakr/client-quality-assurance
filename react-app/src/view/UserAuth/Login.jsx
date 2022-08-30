import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setToken, signIn } from "../../store/auth";
import axiosInstance, { setAxiosToken } from "../../axios";
import { base } from "../../api";
import { loginSchema, validateUser } from "../../Validations/Validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    // console.log(data);
    handleSignIn(data);
  };

  const login = async (data) => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/auth/login",
        data: {
          email: data.email,
          password: data.password,
        },
      });

      setAxiosToken(response?.data?.data?.attributes?.token);
      dispatch(setToken(response?.data?.data?.attributes?.token));
      getUser();
      // console.log(response.data.data.attributes.token);
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

  const handleSignIn = async (data) => {
    // event.preventDefault();
    try {
      // console.log(data);
      const isValid = await validateUser(data, loginSchema);

      console.log("isValid", isValid);

      if (!isValid)
        return toast.error(t("signIn.wrong"), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      await login(data);
    } catch (error) {
      console.log("error logging in");
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const options = ["English", "Kurdish"];
  const { t, i18n } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    // eslint-disable-next-line default-case
    switch (e.target.value) {
      case 0:
        i18n.changeLanguage("eng");
        break;
      case 1:
        i18n.changeLanguage("krd");
        break;
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
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
                {t("signIn.signin")}
              </Typography>
              <form>
                <Box component="div" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label={t("signIn.email")}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    {...register("email")}
                    error={errors?.email?.message ? true : false}
                    helperText={errors?.email?.message}
                    // value={inputEmail}
                    // onChange={(e) => setInputEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    type="password"
                    required
                    fullWidth
                    id="password"
                    label={t("signIn.password")}
                    name="password"
                    autoComplete="password"
                    autoFocus
                    {...register("password")}
                    error={errors?.password?.message ? true : false}
                    helperText={errors?.password?.message}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />

                  <Link to="/signup" variant="body2">
                    {t("signIn.notSingin")}
                  </Link>
                  <br />
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      {t("signIn.signin")}
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
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
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

//fix the bug
//get request lanaw require auth dane ka dashdaney ba condition be ble if(user === null){get the user info && det it to reducer}
