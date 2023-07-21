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

const initState = {
  basicDetails: {
    title: "",
    nameWithInitials: "",
    nameDenotedbyInit: "",
    otherName: "",
    nic: "",
    dateOfBirth: null,
    sex: "",
    civilStatus: "",
    AddressLine1: "",
    AddressLine2: "",
    nationality: "",
    religion: "",
    ethnicity: "",
    mobileNo1: "",
    mobileNo2: "",
    email: "",
  },
  eduDetails: [],
  proDetails: {
    example1: "",
    example2: "",
    example3: "",
  },
  otherDetails: {
    example1: "",
    example2: "",
    example3: "",
  },
  declaration: {
    example1: "",
    example2: "",
    example3: "",
  },
};

const Application = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [details, setDetails] = useState(initState);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.vacancy) {
      navigate("./home");
    }
  }, []);

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
        {/* sx={{ width: isMobile ? "100%" : "85%" }}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "1rem",
            //  isMobile ? "1rem" : "2rem",
            // margin: isMobile || isTablet ? "1rem 0.5rem" : "1rem 4rem",
          }}
        >
          <Outlet context={[details, setDetails, setActiveStep]} />
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
