import React from "react";
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import { useLocation, Outlet } from "react-router-dom";
import StepGuide from "../../components/StepGuide";

const Application = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 800px)");

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        pr: "10px",
        pl: "10px",
        textAlign: "center",
      }}
    >
      <Typography
        fontSize={isMobile ? "14px" : "18px"}
        sx={{
          fontWeight: 700,
          mb: "1rem",
          pt: "1rem",
        }}
      >
        Application for the post {location?.state?.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1rem" : "2rem",
          margin: isMobile || isTablet ? "1rem 0.5rem" : "1rem 4rem",
        }}
      >
        <Box sx={{ width: isMobile ? "100%" : "85%" }}>
          <Outlet />
        </Box>
        <StepGuide isMobile={isMobile} />
      </Box>
    </Box>
  );
};

export default Application;
