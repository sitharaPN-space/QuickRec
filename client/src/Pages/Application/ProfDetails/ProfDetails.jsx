import {
  Paper,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "../../../components/Input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUploader from "../../../components/FileUploader";
import StepperButton from "../../../components/StepperButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProfComponent from "../../../components/ProfComponent";
import { useDispatch, useSelector } from "react-redux";
import { setProfessionalQulifications } from "../../../state/UserApplication";

const initProfDetail = {
  title: "",
  organization: "",
  startDate: "",
  endDate: "",
  description: "",
  attachement: "",
};

const detail = {
  title: "Systems Engineer",
  organization: "National Water Supply & Drainage Board",
  startDate: "Jan 2017",
  endDate: "Feb 2023",
  description:
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
  attachement: "",
};

const ProfDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const [profDetail, setProfDetail] = useState(initProfDetail);
  // const [eduDetailsList, setEduDetailsList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profDetailsList = useSelector(
    (state) => state.userApplication.experience
  );

  useEffect(() => {
    setCurrentStep(2);
    dispatch(setProfessionalQulifications(detail));
  }, []);

  // useEffect(() => {}, [eduDetailsList]);

  const handleChange = (e) => {
    setProfDetail({ ...profDetail, [e.target.name]: e.target.value });
  };

  const handleAddDetail = () => {
    console.log(profDetail);
    dispatch(setProfessionalQulifications(profDetail));
  };

  const handleNext = (e) => {};

  const handleBack = () => {
    navigate("/application/eduDetails");
  };
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ p: "1.5rem" }}>
          <Input
            name="title"
            label="Title/ Role *"
            handleChange={handleChange}
            required
          />
          <Input
            name="organization"
            label="Organization *"
            handleChange={handleChange}
            required
          />
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                >
                  Start Date *
                </Typography>
                <DatePicker
                  name="startDate"
                  // value={eduDetail.startDate}
                  // value={moment(eduDetail.startDate).format("MMM yyyy")}
                  // value={eduDetail?.startDate}
                  onChange={(newValue) =>
                    setProfDetail({
                      ...profDetail,
                      startDate: newValue?.$d,
                    })
                  }
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                  slotProps={{ textField: { size: "small" } }}
                  views={["month", "year"]}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                >
                  End Date *
                </Typography>
                <DatePicker
                  name="endDate"
                  // value={moment(eduDetail.endDate).format("MMM yyyy")}
                  // value={moment(eduDetail.endDate).format("MMM yyyy")}
                  // formatDate={(date) => moment(date).format("DD-MM-YYYY")}
                  // value={eduDetail?.endDate}
                  onChange={(newValue) => {
                    setProfDetail({
                      ...profDetail,
                      endDate: newValue?.$d,
                    });
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                  slotProps={{ textField: { size: "small" } }}
                  views={["month", "year"]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Input
            name="description"
            label="Description"
            handleChange={handleChange}
            multiline
          />

          <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              Upload your Certificate
            </Typography>
            <FileUploader />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Button onClick={() => handleAddDetail()}>
              <AddCircleIcon sx={{ width: "3rem", height: "3rem" }} />
            </Button>
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
      <Box sx={{ display: "flex", flexDirection: "column", mt: "2rem" }}>
        {profDetailsList.map((detail, index) => {
          return <ProfComponent key={index} profDetail={detail} />;
        })}
      </Box>
    </div>
  );
};

export default ProfDetails;
