import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CareerBanner = () => {
  const theme = useTheme();
  const isNoneMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box
      height={isNoneMobile ? "50px" : "40px"}
      width="100%"
      backgroundColor={theme.palette.secondary.main}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant={isNoneMobile ? "h4" : "h5"} sx={{ fontWeight: 500 }}>
        Careers
      </Typography>
    </Box>
  );
};

export default CareerBanner;
