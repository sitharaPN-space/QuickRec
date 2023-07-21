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

const Declaration = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [details, setDetails, setActiveStep] = useOutletContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { declaration } = details;

  useEffect(() => setActiveStep(4), []);

  const handlePrevious = () => {
    navigate("/application/otherDetails", { state });
  };

  const handleSubmit = () => {
    console.log({ state, details });
    navigate("/home");
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      declaration: {
        ...declaration,
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
          value={declaration.example1}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example2"
          value={declaration.example2}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <Input
          name="example3"
          value={declaration.example3}
          label="Example *"
          handleChange={handleChange}
          required
        />
        <ButtonComp
          sx={{ m: "5rem auto", p: "1rem 0.5rem" }}
          onClick={handleSubmit}
        >
          Submit Application
        </ButtonComp>
        {!isMobile && (
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <div style={{ textAlign: "right" }}>
              <ButtonComp sx={{ mt: "1rem" }} onClick={handlePrevious}>
                Previous
              </ButtonComp>
            </div>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Declaration;
