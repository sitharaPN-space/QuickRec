import { useState, useEffect } from "react";
import { Paper, Grid, useMediaQuery, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import DetailCard from "../../../components/DetailCard";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAppAchievementMutation } from "../../../state/api";

const initAchievement = {
  title: "",
  organization: "",
  startDate: null,
  endDate: null,
  description: "",
  attachmentPath: "",
};

const ProDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [setActiveStep] = useOutletContext();
  const user = useSelector((state) => state.userContext.data);
  const [createAppAchievement] = useCreateAppAchievementMutation();
  const [achievement, setAchievement] = useState(initAchievement);
  const [isEditing, setIsEditing] = useState(false);
  const [attachment, setAttachment] = useState();
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
    createAppAchievement({
      ...achievement,
      userId: user.result.UserId,
    });
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
          <Grid
            container
            rowSpacing={2}
            columnSpacing={isMobile ? 2 : 5}
            sx={{ p: "1.5rem" }}
          >
            {" "}
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
            <Input
              name="startDate"
              type="date"
              value={achievement.startDate}
              handleChange={handleChange}
              label="Start Date *"
              format="MMMM-YYYY"
              required
              half
            />
            <Input
              name="endDate"
              type="date"
              value={achievement.endDate}
              handleChange={handleChange}
              label="End Date *"
              format="MMMM-YYYY"
              required
              half
            />
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
              name="attachmentPath"
              value={achievement.attachmentPath}
              setAttachment={setAttachment}
              type="file"
              label="Upload *"
              handleChange={handleChange}
              required
              half
            />
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <div style={{ textAlign: "right" }}>
                {isEditing ? (
                  <ButtonComp sx={{ mt: "1rem" }} type="submit">
                    Save
                  </ButtonComp>
                ) : (
                  <Button sx={{ mt: "1rem" }} type="submit">
                    <AddCircleIcon sx={{ width: "3rem", height: "3rem" }} />
                  </Button>
                )}
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
