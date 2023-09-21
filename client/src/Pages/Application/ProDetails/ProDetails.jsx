import { useState, useEffect } from "react";
import { Paper, Grid, useMediaQuery, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import DetailCard from "../../../components/DetailCard";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateAppExperienceMutation,
  useDeleteAppExperienceMutation,
  useGetAppExpDetailsQuery,
} from "../../../state/api";
import DeleteConfirmation from "../../../components/DeleteConfirmation";

const initExperience = {
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
  const [createAppExperience] = useCreateAppExperienceMutation();
  const [deleteAppExperience] = useDeleteAppExperienceMutation();
  const { data: appExpDetails, isLoading: detailsLoading } =
    useGetAppExpDetailsQuery({
      userId: user.result.UserId,
    });
  const [experienceDetails, setExperienceDetails] = useState(initExperience);
  const [isEditing, setIsEditing] = useState(false);
  const [attachment, setAttachment] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { experience } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(2), [setActiveStep]);

  useEffect(() => {
    !detailsLoading &&
      dispatch(
        setApplicationData({
          experience: appExpDetails?.data ?? experience,
        })
      );
  }, [dispatch, appExpDetails?.data, detailsLoading]);

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
    createAppExperience({
      ...experienceDetails,
      userId: user.result.UserId,
    });
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteButton = (detailId) => {
    setOpen(true);
    setDeleteId(detailId);
  };

  const handleDelete = () => {
    setOpen(false);
    deleteAppExperience(deleteId);
  };

  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <Paper sx={{ display: "flex" }}>
        <DeleteConfirmation
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
        <form id="application" onSubmit={handleAdd}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={isMobile ? 2 : 5}
            sx={{ p: "1.5rem" }}
          >
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
            <Input
              name="startDate"
              type="date"
              value={experienceDetails.startDate}
              handleChange={handleChange}
              label="Start Date *"
              format="MMMM-YYYY"
              required
              half
            />
            <Input
              name="endDate"
              type="date"
              value={experienceDetails.endDate}
              handleChange={handleChange}
              label="End Date *"
              format="MMMM-YYYY"
              required
              half
            />
            <Input
              name="description"
              value={experienceDetails.description}
              label="Description *"
              handleChange={handleChange}
              size="medium"
              multiline
              minRows={5}
              maxRows={8}
            />
            <Input
              name="attachmentPath"
              value={experienceDetails.attachmentPath}
              type="file"
              label="Upload *"
              setAttachment={setAttachment}
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
              onDelete={() => handleDeleteButton(detail.expDetailId)}
              onEdit={() => handleEdit(i)}
            />
          ))}
      </Paper>
    </div>
  );
};

export default ProDetails;
