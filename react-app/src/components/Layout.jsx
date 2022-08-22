import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { signOut } from "../store/auth";
import CategoryImage from "../Assets/category.png";
import QuestionsIcon from "../Assets/conversation.png";
import GroupIcon from "../Assets/group.png";
import LogoutIcon from "../Assets/logout.png";
import ListOfUsersIcon from "../Assets/setting.png";
import userIcon from "../Assets/user (1).png";
import {
  AppBar,
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Icon,
  Drawer,
  Avatar,
  IconButton,
  List,
  ListItem,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: 8,

  backgroundColor: theme.palette.grey[200],
  textDecoration: "none",
  margin: theme.spacing(2),
  padding: theme.spacing(1.5, 2.5),
}));

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const auth = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const options = ["English", "Kurdish"];

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

  const navItems = [
    {
      label: t("dashboard.Questions"),
      onClick: () => navigate("/questions"),
      img: QuestionsIcon,
      hasAccess: true,
      selected: location.pathname === "/questions",
    },
    {
      label: t("dashboard.ListOfUsers"),
      onClick: () => navigate("/users"),
      img: GroupIcon,
      hasAccess: auth?.user?.role_ids?.find((item) => item === 1),
      selected: location.pathname === "/users",
    },
    {
      label: t("dashboard.QuestionCategories"),
      onClick: () => navigate("/category"),
      img: CategoryImage,
      hasAccess: true,
      selected: location.pathname === "/category",
    },
    {
      label: t("dashboard.Roles"),
      onClick: () => navigate("/role"),
      img: ListOfUsersIcon,
      hasAccess: auth?.user?.role_ids?.find((item) => item === 1),
      selected: location.pathname === "/role",
    },
    {
      label: t("dashboard.Logout"),
      onClick: () => {
        dispatch(signOut());
        navigate("/");
      },
      img: LogoutIcon,
      hasAccess: true,
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Box
          onClick={() => {
            navigate("/profile");
          }}
          
        >
          <Typography
            variant="h6"
            noWrap
            
            sx={{ p: 2, fontWeight: "bold", color: "#f6f9fd" , fontSize: 24}}
          >
            { t("dashboard.AskAway")}
          </Typography>
          <AccountStyle >
            <Avatar  src={userIcon} alt="photoURL" />
            <Box  sx={{ ml: 2 }} >
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {auth?.user?.first_name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {auth?.user?.role_ids}
              </Typography>
            </Box>
          </AccountStyle>
        </Box>
      </Toolbar>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {navItems.map(
          ({ label, onClick, img, hasAccess, selected }, index) =>
            hasAccess && (
              <ListItem
              disablePadding
                selected={selected}
                key={index}
                onClick={onClick}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#f6f9fd" }}>
                    <Icon>
                      <img src={img} alt="" height={25} width={25} />
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={label} sx={{ color: "#f6f9fd" }} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f6f9fd", height: "140vh" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        // sx= {{ backgroundColor: "#273469" } }
        sx={{
          // backgroundColor: "#273469",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#f6f9fd",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Toolbar>
          <Tooltip title="Language">
            <IconButton
              sx={{ color: "black" }}
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

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
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{ sx: { backgroundColor: "#273469" } }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          m: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
