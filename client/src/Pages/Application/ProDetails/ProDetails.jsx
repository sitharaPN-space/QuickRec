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
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";

const ProDetails = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [details, setDetails, setActiveStep] = useOutletContext();
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { experience } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(2), []);

  const handlePrevious = () => {
    navigate("/application/eduDetails", location);
  };

  const handleNext = () => {
    navigate("/application/otherDetails", { state });
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      experience: {
        ...experience,
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
          value={experience.example1}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example2"
          value={experience.example2}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example3"
          value={experience.example3}
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

export default ProDetails;
