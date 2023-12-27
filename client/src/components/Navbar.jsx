import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  Drawer,
  Typography,
} from "@mui/material";
import ListItemStyle from "./ListItemStyle";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "../utils/userValidation";
import { api } from "../state/api";
import { AccountCircle, House, Logout, Menu } from "@mui/icons-material";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = ({
  active,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  scrollTrigger,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userContext.data);

  useEffect(() => {
    if (isTokenExpired()) {
      handleLogOut();
    }
  });

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(api.util.resetApiState());
    dispatch(logOut());
  };
  const handleClick = (navigateTo) => {
    !isNonMobile && setIsSidebarOpen(false);
    navigate(navigateTo);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.main,
        paddingBottom: "2rem",
      }}
    >
      <AppBar
        position={scrollTrigger ? "fixed" : "static"}
        sx={{
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          maxHeight: isNonMobile ? "50px" : "40px",
          width: "100%",
          backgroundColor: theme.palette.primary[500],
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          {!isNonMobile ? (
            <Box sx={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  overflowX: "hidden",
                }}
              >
                <IconButton
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <Menu />
                </IconButton>
                <ListItemStyle
                  index="2"
                  active={active}
                  sx={{ marginRight: { sm: "initial", xs: "-2rem" } }}
                  subMenu={[
                    {
                      name: "User Profile",
                      icon: <AccountCircle />,
                      onClick: () => {},
                    },
                    {
                      name: "Log Out",
                      icon: <Logout />,
                      onClick: handleLogOut,
                    },
                  ]}
                >
                  <ProfileAvatar />
                </ListItemStyle>
              </div>
              <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={() => {
                  setIsSidebarOpen((i) => !i);
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: theme.palette.primary[500],
                    width: 180,
                  },
                }}
              >
                <ListItemStyle
                  index="1"
                  icon={<House />}
                  onClick={() => handleClick("/home")}
                >
                  Home
                </ListItemStyle>
              </Drawer>
            </Box>
          ) : (
            <Box
              component="nav"
              sx={{
                width: "100%",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <ListItemStyle
                    index="1"
                    active={active}
                    icon={<House />}
                    onClick={() => handleClick("/home")}
                  >
                    Home
                  </ListItemStyle>
                </div>
                <ListItemStyle
                  index="2"
                  active={active}
                  icon={<ProfileAvatar />}
                  subMenu={[
                    {
                      name: "User Profile",
                      icon: <AccountCircle />,
                      onClick: () => {},
                    },
                    {
                      name: "Log Out",
                      icon: <Logout />,
                      onClick: handleLogOut,
                    },
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Typography fontWeight={500}>
                      {user?.result?.UserName.split(" ")[0]}
                    </Typography>
                    <Typography fontSize={"0.7rem"}>
                      {user?.result?.UserRole}
                    </Typography>
                  </div>
                </ListItemStyle>
              </List>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
