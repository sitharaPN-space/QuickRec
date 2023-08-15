import { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import StepGuide from "../../components/StepGuide";
import { useDispatch } from "react-redux";
import { initState, setApplicationData } from "../../state/UserApplication";

const Application = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.vacancy) {
      navigate("./home");
    }
  }, [location?.state?.vacancy, navigate]);

  useEffect(() => {
    dispatch(setApplicationData(initState));
  }, [dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        pr: "10px",
        pb: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography
          fontSize={isMobile ? "14px" : "18px"}
          sx={{
            fontWeight: 700,
            mb: "1rem",
            pt: "1rem",
          }}
        >
          Application for the post {location?.state?.vacancy}
        </Typography>
      </div>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "1rem",
          }}
        >
          <Outlet context={[setActiveStep]} />
          <StepGuide
            state={location}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            isMobile={isMobile}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Application;
