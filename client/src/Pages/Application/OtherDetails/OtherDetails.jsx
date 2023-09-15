import { useState, useEffect } from "react";
import { Paper, Typography, Grid, useMediaQuery } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import DetailCard from "../../../components/DetailCard";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";

const initAchievement = {
  title: "",
  organization: "",
  startDate: null,
  endDate: null,
  description: "",
  upload: "",
};

const ProDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [setActiveStep] = useOutletContext();
  const [achievement, setAchievement] = useState(initAchievement);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherAchievements } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(3), [setActiveStep]);

  const handlePrevious = () => {
    navigate("/application/proDetails", { state });
  };

  const handleNext = (e) => {
    if (otherAchievements.length > 0) {
      e.preventDefault();
      navigate("/application/declaration", { state });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      setApplicationData({
        otherAchievements: [...otherAchievements, achievement],
      })
    );
    setAchievement(initAchievement);
    isEditing && setIsEditing(false);
  };

  const handleChange = (e) => {
    setAchievement({
      ...achievement,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setAchievement(otherAchievements[index]);
    handleDelete(index);
  };

  const handleDelete = (index) => {
    const newotherAchievements = otherAchievements.filter(
      (value, i) => i !== index
    );
    dispatch(
      setApplicationData({
        otherAchievements: newotherAchievements,
      })
    );
  };

  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <Paper sx={{ display: "flex" }}>
        <form id="application" onSubmit={handleAdd}>
          <Grid container spacing={2} sx={{ p: "1.5rem" }}>
            <Input
              name="title"
              value={achievement.title}
              label="Title / Role *"
              handleChange={handleChange}
              required
            />
            <Input
              name="organization"
              value={achievement.organization}
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
                    Start Date *
                  </Typography>
                  <DateField
                    value={
                      achievement.startDate && dayjs(achievement.startDate)
                    }
                    required
                    format="MMMM-YYYY"
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "startDate",
                          value: newValue.$d.toDateString(),
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
                    value={achievement.endDate && dayjs(achievement.endDate)}
                    required
                    format="MMMM-YYYY"
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "endDate",
                          value: newValue.$d.toDateString(),
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
              value={achievement.description}
              label="Description *"
              handleChange={handleChange}
              size="medium"
              multiline
              minRows={5}
              maxRows={8}
            />
            <Input
              name="upload"
              value={achievement.upload}
              disabled
              type="file"
              label="Upload *"
              handleChange={handleChange}
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
                    Save & Next
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
          otherAchievements.map((detail, i) => (
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
