import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  ListItem,
  Typography,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemStyle from "./ListItemStyle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isTokenExpired } from "../utils/userValidation";
import { api } from "../state/api";

const Navbar = ({
  active,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  window,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userContext.data);

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
  const handleClick = (e, navigateTo) => {
    !isNonMobile && setIsSidebarOpen(false);
    navigateTo && navigate(navigateTo);
  };
  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <AppBar
        sx={{
          position: "static",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: isNonMobile ? "flex-end" : "flex-start",
          maxHeight: isNonMobile ? "50px" : "40px",
          width: "100%",
          backgroundColor: theme.palette.secondary.main,
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
              <Drawer
                container={container}
                variant="temporary"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(!isSidebarOpen)}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                <ListItem role="none">
                  <ListItemStyle
                    key="1"
                    onClick={(e) => handleClick(e, "/home")}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    Home
                  </ListItemStyle>
                </ListItem>
                <ListItem role="none">
                  <ListItemStyle
                    key="5"
                    onClick={handleClick}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    Profile
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="6"
                    onClick={handleLogOut}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      width: "max-content",
                    }}
                  >
                    Log out
                  </ListItemStyle>
                </ListItem>
              </Drawer>
            </Box>
          ) : (
            <Box component="nav">
              <List sx={{ display: "flex" }}>
                <ListItem role="none">
                  <ListItemStyle
                    key="1"
                    onClick={(e) => handleClick(e, "/home")}
                    sx={{
                      borderBottom: `5px solid ${
                        active === "1"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                    }}
                  >
                    Home
                  </ListItemStyle>
                </ListItem>
                <ListItem role="none">
                  <ListItemStyle
                    key="3"
                    onClick={() => {}}
                    sx={{
                      borderBottom: `5px solid ${
                        active === "3"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                    }}
                  >
                    Profile
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="4"
                    onClick={() => handleLogOut()}
                    sx={{
                      borderBottom: `5px solid ${
                        active === "4"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                      width: "max-content",
                    }}
                  >
                    Log out
                  </ListItemStyle>
                </ListItem>
              </List>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{
          margin: "10px 20px 0 20px",
        }}
      >
        <Typography>
          Welcome {user?.result?.UserName ?? user?.result?.name} !
        </Typography>
      </div>
    </div>
  );
};

export default Navbar;
