import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import {
  Box,
  Toolbar,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  CssBaseline,
} from "@mui/material";

const drawerWidth = 240;

export default function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // console.log({ auth });
  // const profile = useSelector((state) => state.auth.user);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          >
            <Toolbar
              sx={{
                pr: "24px",
                bgcolor: "#5c6bc0",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/questions");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="Questions" />
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
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="List of users" />
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
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
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
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <List>
            <ListItem
              disablePadding
              onClick={() => {
                dispatch(signOut());
                navigate("/login");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Outlet />
      </Box>
    </>
  );
}
