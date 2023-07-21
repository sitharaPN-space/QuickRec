import { useEffect } from "react";
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

const OtherDetails = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, details, setDetails, setActiveStep] = useOutletContext();
  const navigate = useNavigate();
  const { basicDetails } = details;

  useEffect(() => setActiveStep(3), []);

  const handlePrevious = () => {
    navigate("/application/proDetails", state);
  };

  const handleNext = () => {
    navigate("/application/declaration", state);
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      basicDetails: {
        ...basicDetails,
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

export default OtherDetails;
