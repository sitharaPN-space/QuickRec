import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "../Assets/WB_Logo.png";
import CareerBanner from "../components/CareerBanner";

const Layout = () => {
  const isNoneMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        alt="Company logo"
        src={logo}
        height={isNoneMobile ? "60px" : "50px"}
        width={isNoneMobile ? "400px" : "300px"}
        sx={{ objectFit: "contain", m: "10px 0" }}
      ></Box>
      <CareerBanner />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
