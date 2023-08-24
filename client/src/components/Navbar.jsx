import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemStyle from "./ListItemStyle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import decode from "jwt-decode";
import { api } from "../state/api";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const user = useSelector((state) => state.userContext.data);

  // useEffect(() => {
  //   const token = user?.token;
  //   console.log("🚀 ~ file: Navbar.jsx:30 ~ useEffect ~ user:", user);
  //   if (token) {
  //     const decodedToken = decode(token);
  //     if (decodedToken * 1000 < new Date().getTime()) handleLogOut();
  //   }
  // }, []);

  const handleClick = (key) => {
    setActive(key);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    dispatch(api.util.resetApiState());
    dispatch(logOut);
  };
  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <AppBar
        sx={{
          position: "static",
          boxShadow: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: isNonMobile ? "flex-end" : "flex-start",
          maxHeight: isNonMobile ? "50px" : "40px",
          width: "100%",
          backgroundColor: theme.palette.secondary.main,
          "& .MuiToolbar-root": {
            minHeight: "0px",
          },
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          {!isNonMobile ? (
            <Box>
              <IconButton
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <Box component="nav">
              <List sx={{ display: "flex", p: "0" }}>
                <ListItem role="none">
                  <ListItemStyle
                    key="1"
                    onClick={() => navigate("/home")}
                    sx={{
                      borderBottom:
                        active === "1"
                          ? `5px solid ${theme.palette.primary[500]}`
                          : "none",
                    }}
                  >
                    Home
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="2"
                    onClick={() => handleClick("2")}
                    sx={{
                      borderBottom:
                        active === "2"
                          ? `5px solid ${theme.palette.primary[500]}`
                          : "none",
                    }}
                  >
                    Profile
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="3"
                    onClick={() => handleLogOut()}
                    sx={{
                      borderBottom:
                        active === "3"
                          ? `5px solid ${theme.palette.primary[500]}`
                          : "none",
                      width: "120px",
                    }}
                  >
                    Log out
                  </ListItemStyle>
                </ListItem>
              </List>

              {/* <LinkStyle to="/home" underline="hover">
              Home
            </LinkStyle>
            <LinkStyle to="/Profile" underline="hover">
              Profile
            </LinkStyle>
            <LinkStyle to="/signin" underline="hover" onClick={handleLogOut}>
              Logout
            </LinkStyle> */}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{
          margin: "10px 20px 0 20px",
        }}
      >
        <Typography>Welcome {user.data.UserName} !</Typography>
      </div>
    </div>
  );
};

export default Navbar;
