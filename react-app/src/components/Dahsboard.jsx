import React from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "../user.png";
import {
  Box,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  CssBaseline,
  Avatar,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import "../i18n";

//F0F7EE == bgColor of

const drawerWidth = 240;

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 2.5),
  borderRadius: 8,
  backgroundColor: "#F4F6F6",
  textDecoration: "none",
}));

export default function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // console.log({ auth });
  // const profile = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const options = ["English", "Kurdish"];
  const { t, i18n } = useTranslation(); //useTranslation is a hook that returns the current language and the function to change the language

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
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
    <>
      <Box
        sx={{ display: "flex", backgroundColor: "#F4F6F6", height: "120vh" }}
      >
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            elevation={0}
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              backgroundColor: "#F4F6F6",
              // opacity: 0.2,
            }}
          >
            <Toolbar
              sx={{
                pr: "24px",
                color: "black",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {/* {t("dashboard.title")} */}
              </Typography>
              {/* ///////////////////////////////////// */}
              {/* <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <LanguageIcon
                    sx={{ width: 32, height: 32, color: "#2C365D" }}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                <MenuItem>
                  <Avatar /> English
                </MenuItem>
                <MenuItem>
                  <Avatar /> Kurdish
                </MenuItem>
              </Menu> */}
              <Tooltip title="Language">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{
                    color: "black",
                    marginRight: "10px",
                    cursor: "pointer",
                    ml: 2,
                  }}
                  color="inherit"
                >
                  <LanguageIcon />
                </IconButton>
              </Tooltip>

              <Menu
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
              {/* ///////////////////////////////////////// */}
              {/* <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <LanguageIcon sx={{ color: "#2C365D" }} />
              </IconButton> */}
            </Toolbar>
          </AppBar>
        </Box>

        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#2C365D",
              color: "white",
            },
          }}
          sx={{
            width: drawerWidth,
            // hideBackdrop: true,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              mt: 5,
              mb: 5,
              mx: 2.5,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <AccountStyle>
              <Avatar src={Image} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {auth?.user?.first_name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {auth?.user?.role_ids}
                </Typography>
              </Box>
            </AccountStyle>
          </Box>

          <Divider sx={{ bgcolor: "lightgrey" }} />
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/questions");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <QuestionAnswerIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={t("dashboard.Questions")} />
              </ListItemButton>
            </ListItem>

            {auth?.user?.role_ids?.find((item) => item === 1) && (
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/users");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <RecentActorsIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={t("dashboard.ListOfUsers")} />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem
              disablePadding
              onClick={() => {
                navigate("/category");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={t("dashboard.QuestionCategories")} />
              </ListItemButton>
            </ListItem>

            {auth?.user?.role_ids?.find((item) => item === 1) && (
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/role");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIndIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={t("dashboard.Roles")} />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <List sx={{ mt: 40 }}>
            <ListItem
              disablePadding
              onClick={() => {
                dispatch(signOut());
                navigate("/login");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={t("dashboard.Logout")} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Outlet />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: "#F4F6F6" }}
        />
      </Box>
    </>
  );
}
