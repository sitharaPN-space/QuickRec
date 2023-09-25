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
import { useCreateApplicationSubmissionMutation } from "../../../state/api";
import Error from "../../../components/Error";

const Declaration = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const user = useSelector((state) => state.userContext.data);
  const [setActiveStep] = useOutletContext();
  const [createApplicationSubmission] =
    useCreateApplicationSubmissionMutation();
  const { state } = useLocation();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState();
  const [cv, setCv] = useState();
  const [nic, setNic] = useState();
  const [birthCertificate, setBirthCertificate] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { attachments } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(4), [setActiveStep]);

  const handlePrevious = () => {
    navigate("/application/otherDetails", { state });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createApplicationSubmission({
      ...attachments,
      cv: cv,
      nic: nic,
      birthCertificate: birthCertificate,
      vacancyId: state.vacancyId,
      userId: user.result.UserId,
    });
    result?.error ? setError(result.error?.data) : navigate("/home");
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
              name="cvPath"
              value={attachments.cvPath}
              setAttachment={setCv}
              label="You CV *"
              type="file"
              handleChange={handleChange}
              required
              half
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="nicPath"
              value={attachments.nicPath}
              setAttachment={setNic}
              label="Copy of NIC *"
              type="file"
              handleChange={handleChange}
              required
              half
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="birthCertificatePath"
              value={attachments.birthCertificatePath}
              setAttachment={setBirthCertificate}
              label="Birth Certificate *"
              type="file"
              handleChange={handleChange}
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
                  required
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
              sx={{ m: "5rem auto 3rem", p: "1rem 0.5rem" }}
              type="submit"
            >
              Submit Application
            </ButtonComp>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <div style={{ textAlign: "right" }}>
                <ButtonComp onClick={handlePrevious}>Previous</ButtonComp>
              </div>
            </Grid>
          )}
          <Error error={error} setError={setError} />
        </Grid>
      </form>
    </Paper>
  );
};

export default Declaration;
