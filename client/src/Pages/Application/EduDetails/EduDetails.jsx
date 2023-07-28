import { useState, useEffect } from "react";
import {
  Paper,
  Select,
  Typography,
  MenuItem,
  Grid,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import DetailCard from "../../../components/DetailCard";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";

const initEducation = {
  type: "",
  institute: "",
  qualification: "",
  feild: "",
  startDate: null,
  endDate: null,
  grade: "",
  upload: { name: "Choose File" },
};

const EduDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [setActiveStep] = useOutletContext();
  const [education, setEducation] = useState(initEducation);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eduQualification } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(1), []);

  const handlePrevious = () => {
    navigate("/application/basicDetails", { state });
  };

  const handleNext = (e) => {
    if (eduQualification.length > 0) {
      e.preventDefault();
      navigate("/application/proDetails", { state });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      setApplicationData({
        eduQualification: [...eduQualification, education],
      })
    );
    setEducation(initEducation);
    isEditing && setIsEditing(false);
  };

  const handleChange = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEducation(eduQualification[index]);
    handleDelete(index);
  };

  const handleDelete = (index) => {
    const newEduQualification = eduQualification.filter(
      (value, i) => i !== index
    );
    dispatch(
      setApplicationData({
        eduQualification: newEduQualification,
      })
    );
  };

  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <Paper sx={{ display: "flex" }}>
        <form onSubmit={handleAdd}>
          <Grid container spacing={2} sx={{ p: "1.5rem" }}>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Type of Education *
              </Typography>
              <FormControl size="small">
                <Select
                  name="type"
                  value={education.type}
                  required
                  onChange={handleChange}
                  sx={{
                    minWidth: "140px",
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Input
              name="institute"
              value={education.institute}
              label="University / Institute / School *"
              handleChange={handleChange}
              required
            />
            <Input
              name="qualification"
              value={education.qualification}
              label="Name of Qualification *"
              handleChange={handleChange}
              required
            />
            <Input
              name="feild"
              value={education.feild}
              label="Field of Study *"
              handleChange={handleChange}
              required
            />
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Start Date *
                  </Typography>
                  <DateField
                    value={education.startDate}
                    format="MMMM-YYYY"
                    required
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "startDate",
                          value: newValue,
                        },
                      });
                    }}
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) => theme.palette.background.main,
                    }}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    End Date *
                  </Typography>
                  <DateField
                    value={education.endDate}
                    format="MMMM-YYYY"
                    required
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "endDate",
                          value: newValue,
                        },
                      });
                    }}
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) => theme.palette.background.main,
                    }}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Grade *
              </Typography>
              <FormControl size="small">
                <Select
                  name="grade"
                  value={education.grade}
                  required
                  onChange={handleChange}
                  sx={{
                    minWidth: "140px",
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Input
              name="upload"
              value={education.upload.name}
              type="file"
              label="Upload *"
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
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <div style={{ textAlign: "right" }}>
                <ButtonComp sx={{ mt: "1rem" }} type="submit">
                  {isEditing ? "Save" : "Add"}
                </ButtonComp>
              </div>
            </Grid>
            {!isMobile && !isEditing && (
              <Grid item xs={12} sx={{ textAlign: "left" }}>
                <div style={{ textAlign: "right" }}>
                  <ButtonComp
                    sx={{ mt: "1rem", mr: "0.5rem" }}
                    onClick={handlePrevious}
                  >
                    Previous
                  </ButtonComp>
                  <ButtonComp
                    sx={{ mt: "1rem" }}
                    onClick={handleNext}
                    type="submit"
                  >
                    Next
                  </ButtonComp>
                </div>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
      <Paper
        sx={{
          mt: "2rem",
        }}
      >
        {!isEditing &&
          eduQualification.map((detail, i) => (
            <DetailCard
              key={i}
              detail={detail}
              onDelete={() => handleDelete(i)}
              onEdit={() => handleEdit(i)}
            />
          ))}
      </Paper>
    </div>
  );
};

export default EduDetails;
