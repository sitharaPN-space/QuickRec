import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../api";

const Declaration = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [setActiveStep] = useOutletContext();
  const { state } = useLocation();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.userApplication);
  const { attachments } = details;

  useEffect(() => setActiveStep(4), [setActiveStep]);

  const handlePrevious = () => {
    navigate("/application/otherDetails", { state });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.applicationSubmit({ state, details });
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
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
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} sx={{ p: "1.5rem" }}>
          <Grid item xs={12}>
            <Input
              name="cv"
              value={attachments.cv.name}
              label="You CV *"
              type="file"
              handleChange={(e) => {
                e.target.files[0]?.type === "application/pdf"
                  ? handleChange({
                      target: { name: "cv", value: e.target.files[0] },
                    })
                  : alert("Invalid filetype !");
              }}
              required
              half
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="nic"
              value={attachments.nic.name}
              label="Copy of NIC *"
              type="file"
              handleChange={(e) => {
                e.target.files[0]?.type === "application/pdf"
                  ? handleChange({
                      target: { name: "nic", value: e.target.files[0] },
                    })
                  : alert("Invalid filetype !");
              }}
              required
              half
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="birthCertificate"
              value={attachments.birthCertificate.name}
              label="Birth Certificate *"
              type="file"
              handleChange={(e) => {
                e.target.files[0]?.type === "application/pdf"
                  ? handleChange({
                      target: {
                        name: "birthCertificate",
                        value: e.target.files[0],
                      },
                    })
                  : alert("Invalid filetype !");
              }}
              required
              half
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              mt: "2rem",
              textAlign: "left",
              fontSize: "11px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  sx={{ m: "1rem" }}
                />
              }
              label={
                <Typography sx={{ fontSize: isMobile ? "12px" : "1rem" }}>
                  I do hereby certify that the particulars furnished by me in
                  this application are true and accurate. I am alse aware that,
                  any particulars contained herein are found to be false or
                  incorrect, I am liable to be disqualified before selection ro
                  to bedmissed without any compensation if such detection is
                  made after appointment. *
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonComp
              sx={{ m: "5rem auto", p: "1rem 0.5rem" }}
              disabled={!checked}
              type="submit"
            >
              Submit Application
            </ButtonComp>
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  m: "0 1rem 1rem",
                  p: "1rem",
                  color: "#ff0000",
                  border: "1px solid red",
                  borderRadius: "5px",
                }}
              >
                {error.message}
              </Typography>
            )}
          </Grid>
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
      </form>
    </Paper>
  );
};

export default Declaration;
