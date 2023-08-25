import {
  Paper,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  Button,
  Checkbox,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FileUploader from "../../../components/FileUploader";
import StepperButton from "../../../components/StepperButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AchievementComp from "../../../components/AchievementComp";
import { useDispatch, useSelector } from "react-redux";
import { setAchievementsState } from "../../../state/UserApplication";

const initAttachments = {
  userId: "",
  cvCopy: "",
  nicCopy: "",
  BCCopy: "",
  isAgreed: "",
};

const Declaration = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const [declationDetails, setDeclationDetails] = useState(initAttachments);
  const [isAgreed, setIsAgreed] = useState(false);
  const [cvDocument, setCvDocument] = useState(null);
  const [nicDocument, setNicDocument] = useState(null);
  const [bcDocument, setBCDocument] = useState(null);
  const userData = useSelector((state) => state.userContext.data);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  const handleChange = (e) => {
    setDeclationDetails({
      ...declationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e) => {};

  const handleBack = () => {
    navigate("/application/achievements");
  };
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ p: "1.5rem" }}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Declaration
            </Typography>
          </Grid>
          <FileUploader
            label="Your CV *"
            isMobile={isMobile}
            setFile={setCvDocument}
          />
          <Grid item sm={8}></Grid>
          <FileUploader
            label="National Identitiy Card"
            isMobile={isMobile}
            setFile={setNicDocument}
          />
          <Grid item sm={8}></Grid>
          <FileUploader
            label="Birth Certificate"
            isMobile={isMobile}
            setFile={setBCDocument}
          />
          <Grid item sm={8}></Grid>

          {/* <Grid item sm={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              
            </Typography>
            <FileUploader />
          </Grid> */}
          {/* 
          <Grid item sm={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              National Identitiy Card/ Driving Licence
            </Typography>
            <FileUploader />
          </Grid>

          <Grid item sm={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              Birth Certificate
            </Typography>
            <FileUploader />
          </Grid> */}

          <Grid item sx={{ textAlign: "left" }}>
            <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
              <Checkbox
                // sx={{ ml: "-10px" }}
                onChange={(e) => setIsAgreed(!isAgreed)}
              />
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 500, mt: "1rem" }}
              >
                I do hereby certify that the particulars furnished by me in this
                application are true and accurate. I am also aware that, any
                particulars contained herein are found to be false or incorrect,
                I am liable to be disqualified before selection or to
                bedismissed without any compensation if such detection is made
                after appointment. *
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {!isMobile && (
        // <Grid item xs={12} sx={{ textAlign: "right" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <StepperButton handleClick={handleBack} back />
          <StepperButton handleClick={handleNext} next />
        </div>
        // </Grid>
      )}
    </div>
  );
};

export default Declaration;
