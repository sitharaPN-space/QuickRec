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
  useDeleteAppEducationMutation,
  useCreateAppEducationMutation,
  useGetAppEduDetailsQuery,
} from "../../../state/api";
import DeleteConfirmation from "../../../components/DeleteConfirmation";

const initEducation = {
  eduTypeId: "",
  instituteName: "",
  qualification: "",
  fieldOfStudy: "",
  startDate: null,
  endDate: null,
  grade: "",
  attachmentPath: "",
};

const eduTypes = [
  { value: 1, text: "Doctoral Degree" },
  { value: 2, text: "Master" },
  {
    value: 3,
    text: "Postgraduate Certificate",
  },
  { value: 4, text: "Postgraduate Diploma" },
  { value: 5, text: "Bachelors" },
  { value: 6, text: "Diploma" },
  { value: 7, text: "Certificate" },
  { value: 8, text: "Advanced Level" },
  { value: 9, text: "Ordinary Level" },
];

const EduDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const user = useSelector((state) => state.userContext.data);
  const [createAppEducation] = useCreateAppEducationMutation();
  const [deleteAppEducation] = useDeleteAppEducationMutation();
  const { data: appEduDetails, isLoading: detailsLoading } =
    useGetAppEduDetailsQuery({
      userId: user.result.UserId,
    });
  const [setActiveStep] = useOutletContext();
  const [education, setEducation] = useState(initEducation);
  const [isEditing, setIsEditing] = useState(false);
  const [attachment, setAttachment] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eduQualification } = useSelector((state) => state.userApplication);

  useEffect(() => setActiveStep(1), [setActiveStep]);

  useEffect(() => {
    !detailsLoading &&
      dispatch(
        setApplicationData({
          eduQualification: appEduDetails?.data ?? eduQualification,
        })
      );
  }, [dispatch, appEduDetails?.data, detailsLoading]);

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
    createAppEducation({
      createReq: {
        ...education,
        userId: user.result.UserId,
      },
      attachment,
    });
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
    deleteAppEducation(deleteId);
  };

  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <Paper sx={{ display: "flex" }}>
        <DeleteConfirmation
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
        <form value="application" onSubmit={handleAdd}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={isMobile ? 2 : 5}
            sx={{ p: "1.5rem" }}
          >
            <Input
              name="eduTypeId"
              type="select"
              label="Type of Education *"
              required
              value={education.eduTypeId}
              handleChange={handleChange}
              options={eduTypes}
              half
            />
            <Input
              name="instituteName"
              value={education.instituteName}
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
              name="fieldOfStudy"
              value={education.fieldOfStudy}
              label="Field of Study *"
              handleChange={handleChange}
              required
            />
            <Input
              name="startDate"
              type="date"
              value={education.startDate}
              handleChange={handleChange}
              label="Start Date *"
              format="MMMM-YYYY"
              required
              half
            />
            <Input
              name="endDate"
              type="date"
              value={education.endDate}
              handleChange={handleChange}
              label="End Date *"
              format="MMMM-YYYY"
              required
              half
            />
            <Input
              name="grade"
              label="Grade *"
              required
              value={education.grade}
              handleChange={handleChange}
              half
            />
            <Grid item sm={6}></Grid>
            <Input
              name="attachmentPath"
              value={education.attachmentPath}
              type="file"
              setAttachment={setAttachment}
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
              onDelete={() => handleDeleteButton(detail.eduDetailsId)}
              onEdit={() => handleEdit(i)}
            />
          ))}
      </Paper>
    </div>
  );
};

export default EduDetails;
