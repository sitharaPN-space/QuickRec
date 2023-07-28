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
import EducationDetail from "../../../components/EduComponent";
import { useDispatch, useSelector } from "react-redux";
import { setEducationQulifications } from "../../../state/UserApplication";
import moment from "moment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const initEduDetail = {
  educationType: "",
  instituteName: "",
  qualification: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
  attachement: "",
};

const detail = {
  educationType: "Master",
  instituteName: "University of Peradeniya",
  qualification: "Msc in Engineering",
  fieldOfStudy: "Cloud Computing",
  startDate: "Jan 2017",
  endDate: "Feb 2023",
  grade: "second upper",
  attachement: "",
};

const eduTypes = [
  { id: "1", description: "Doctoral Degree" },
  { id: "2", description: "Master" },
  { id: "3", description: "Postgraduate Certificate" },
  { id: "4", description: "Postgraduate Diploma" },
  { id: "5", description: "Bachelors" },
  { id: "6", description: "Diploma" },
  { id: "7", description: "Certificate" },
  { id: "8", description: "Advanced Level" },
  { id: "9", description: "Ordinary Level" },
];

const EduDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useOutletContext();
  const [eduDetail, setEduDetail] = useState(initEduDetail);
  // const [eduDetailsList, setEduDetailsList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eduDetailsList = useSelector(
    (state) => state.userApplication.eduQualification
  );

  useEffect(() => {
    setCurrentStep(1);
    dispatch(setEducationQulifications(detail));
    console.log("EFFECTS");
  }, []);

  // useEffect(() => {}, [eduDetailsList]);

  const handleChange = (e) => {
    setEduDetail({ ...eduDetail, [e.target.name]: e.target.value });
  };

  const handleAddDetail = () => {
    console.log(eduDetail);
    dispatch(setEducationQulifications(eduDetail));
  };

  const handleNext = (e) => {
    navigate("/application/profDetails");
  };

  const handleBack = () => {
    navigate("/application/basicDetails");
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
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Education Qualification
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
              Type of Education *
            </Typography>
            <FormControl size="small">
              <Select
                name="educationType"
                onChange={handleChange}
                sx={{
                  minWidth: "140px",
                  minHeight: "1.4rem",
                  backgroundColor: (theme) => theme.palette.background.main,
                }}
              >
                {eduTypes.map((eduType, index) => (
                  <MenuItem
                    // name="educationType"
                    value={eduType.description}
                    key={eduType.id}
                    // onChange={handleChange}
                  >
                    {eduType.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Input
            name="instituteName"
            label="University/ Institute/ School *"
            handleChange={handleChange}
            required
          />
          <Input
            name="qualification"
            label="Name of Qualification *"
            handleChange={handleChange}
            required
          />
          <Input
            name="fieldOfStudy"
            label="Field of Study *"
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
                    setEduDetail({
                      ...eduDetail,
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
                    setEduDetail({
                      ...eduDetail,
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
            name="grade"
            label="Grade *"
            handleChange={handleChange}
            required
            quarter
          />
          <Grid
            item
            sm={8}
            sx={{ display: isMobile && "none", textAlign: "left" }}
          ></Grid>

          <FileUploader label="Upload your Certificate" isMobile={isMobile} />
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
        {eduDetailsList.map((detail, index) => {
          return (
            <EducationDetail
              key={index}
              eduDetail={detail}
              isMobile={isMobile}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default EduDetails;
