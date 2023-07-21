import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Select,
  Typography,
  useTheme,
  MenuItem,
  Grid,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const EduDetails = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, details, setDetails, setActiveStep] = useOutletContext();
  const navigate = useNavigate();
  const { eduDetails } = details;

  useEffect(() => setActiveStep(1), []);

  const handlePrevious = () => {
    navigate("/application/basicDetails", state);
  };

  const handleNext = () => {
    navigate("/application/proDetails", state);
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      eduDetails: {
        ...eduDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Paper
      sx={{
        display: "flex",
      }}
    >
      <Grid container spacing={2} sx={{ p: "1.5rem" }}>
        <Input
          name="example1"
          value={eduDetails.example1}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example2"
          value={eduDetails.example2}
          label="Example *"
          handleChange={handleChange}
        />
        <Input
          name="example3"
          value={eduDetails.example3}
          label="Example *"
          handleChange={handleChange}
        />
        {!isMobile && (
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <div style={{ textAlign: "right" }}>
              <ButtonComp sx={{ mt: "1rem" }} onClick={handlePrevious}>
                Previous
              </ButtonComp>
              <ButtonComp sx={{ mt: "1rem" }} onClick={handleNext}>
                Next
              </ButtonComp>
            </div>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default EduDetails;
