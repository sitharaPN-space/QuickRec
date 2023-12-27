import { useState } from "react";
import { Box, Toolbar, useMediaQuery, useScrollTrigger } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "../Assets/WB_Logo.png";
import CareerBanner from "../components/CareerBanner";
import Navbar from "../components/Navbar";
import ScrollTop from "../components/ScrollTop";

const Layout = ({ auth }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 79,
  });

  return (
    <Box>
      <Box sx={{ position: "static" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Toolbar id="top" sx={{ p: 0 }} />
          <Box
            component="img"
            alt="Company logo"
            src={logo}
            height={isNonMobile ? "60px" : "50px"}
            width={isNonMobile ? "400px" : "300px"}
            sx={{
              objectFit: "contain",
              m: "10px 0",
            }}
          ></Box>
        </Box>
        {!auth ? (
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
            scrollTrigger={scrollTrigger}
          />
        ) : (
          <CareerBanner />
        )}
      </Box>
      <Box
        sx={{
          pt: scrollTrigger && !auth ? 6.5 : 0,
          minHeight: "calc(100vh - 130px)",
          background: (theme) => theme.palette.background.main,
        }}
      >
        <Outlet />
        <ScrollTop />
      </Box>
    </Box>
  );
};

export default Layout;
