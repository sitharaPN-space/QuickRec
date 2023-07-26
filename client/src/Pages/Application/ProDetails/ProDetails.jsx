import { useState, useEffect } from "react";
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
import { DateField } from "@mui/x-date-pickers/DateField";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import DetailCard from "../../../components/DetailCard";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";

const initExperience = {
  title: "",
  organization: "",
  startDate: null,
  endDate: null,
  description: "",
  upload: { name: "Choose File" },
};

const ProDetails = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [setActiveStep] = useOutletContext();
  const [experienceDetails, setExperienceDetails] = useState(initExperience);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { experience } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(2), []);

  const handlePrevious = () => {
    navigate("/application/eduDetails", { state });
  };

  const handleNext = (e) => {
    if (experience.length > 0) {
      e.preventDefault();
      navigate("/application/otherDetails", { state });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      setApplicationData({
        experience: [...experience, experienceDetails],
      })
    );
    setExperienceDetails(initExperience);
    isEditing && setIsEditing(false);
  };

  const handleChange = (e) => {
    setExperienceDetails({
      ...experienceDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setExperienceDetails(experience[index]);
    handleDelete(index);
  };

  const handleDelete = (index) => {
    const newExperience = experience.filter((value, i) => i !== index);
    dispatch(
      setApplicationData({
        experience: newExperience,
      })
    );
  };

  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <Paper sx={{ display: "flex" }}>
        <form onSubmit={handleAdd}>
          <Grid container spacing={2} sx={{ p: "1.5rem" }}>
            <Input
              name="title"
              value={experienceDetails.title}
              label="Title / Role *"
              handleChange={handleChange}
              required
            />
            <Input
              name="organization"
              value={experienceDetails.organization}
              label="Organization *"
              handleChange={handleChange}
              required
            />
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Start Date
                  </Typography>
                  <DateField
                    value={JSON.parse(experienceDetails.startDate)}
                    required
                    format="MMMM-YYYY"
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "startDate",
                          value: JSON.stringify(newValue),
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
                    End Date
                  </Typography>
                  <DateField
                    value={JSON.parse(experienceDetails.endDate)}
                    required
                    format="MMMM-YYYY"
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "endDate",
                          value: JSON.stringify(newValue),
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
            <Input
              name="description"
              value={experienceDetails.description}
              label="Description"
              handleChange={handleChange}
              size="medium"
              multiline
              minRows={5}
              maxRows={8}
            />
            <Input
              name="upload"
              value={experienceDetails.upload.name}
              disabled
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
          experience.map((detail, i) => (
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

export default ProDetails;
