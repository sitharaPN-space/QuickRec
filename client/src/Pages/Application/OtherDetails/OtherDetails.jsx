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
  const [details, setDetails, setActiveStep] = useOutletContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { otherDetails } = details;

  useEffect(() => setActiveStep(3), []);

  const handlePrevious = () => {
    navigate("/application/proDetails", { state });
  };

  const handleNext = () => {
    navigate("/application/declaration", { state });
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      otherDetails: {
        ...otherDetails,
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
          value={otherDetails.example1}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example2"
          value={otherDetails.example2}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example3"
          value={otherDetails.example3}
          label="Example *"
          handleChange={handleChange}
          required
        />
        {!isMobile && (
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <div style={{ textAlign: "right" }}>
              <ButtonComp
                sx={{ mt: "1rem", mr: "0.5rem" }}
                onClick={handlePrevious}
              >
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
