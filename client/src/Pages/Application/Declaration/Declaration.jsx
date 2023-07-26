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

const Declaration = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [setActiveStep] = useOutletContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.userApplication);
  const { attachments } = details;

  useEffect(() => setActiveStep(4), []);

  const handlePrevious = () => {
    navigate("/application/otherDetails", { state });
  };

  const handleSubmit = () => {
    console.log({ state, details });
    navigate("/home");
  };

  const handleChange = (e) => {
    dispatch(
      setApplicationData({
        attachments: {
          ...attachments,
          [e.target.name]: e.target.value,
        },
      })
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
      }}
    >
      <Grid container spacing={2} sx={{ p: "1.5rem" }}>
        <Input
          name="cv"
          value={attachments.cv.name}
          label="You CV *"
          type="file"
          handleChange={(e) => {
            e.target.files[0]?.type === "application/pdf"
              ? handleChange({
                  target: { name: "upload", value: e.target.files[0] },
                })
              : alert("Invalid filetype !");
          }}
          required
          half
        />
        <Input
          name="nic"
          value={attachments.nic.name}
          label="Copy of NIC *"
          type="file"
          handleChange={(e) => {
            e.target.files[0]?.type === "application/pdf"
              ? handleChange({
                  target: { name: "upload", value: e.target.files[0] },
                })
              : alert("Invalid filetype !");
          }}
          required
          half
        />
        <Input
          name="birthCertificate"
          value={attachments.birthCertificate}
          label="Birth Certificate *"
          type="file"
          handleChange={(e) => {
            e.target.files[0]?.type === "application/pdf"
              ? handleChange({
                  target: { name: "upload", value: e.target.files[0] },
                })
              : alert("Invalid filetype !");
          }}
          required
          half
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
