import { useState, useEffect } from "react";
import { Paper, Grid, useMediaQuery } from "@mui/material";
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
  upload: "",
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

  useEffect(() => setActiveStep(1), [setActiveStep]);

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
        <form id="application" onSubmit={handleAdd}>
          <Grid container spacing={2} sx={{ p: "1.5rem" }}>
            <Input
              name="type"
              type="select"
              label="Type of Education *"
              required
              value={education.type}
              handleChange={handleChange}
              options={[
                { value: "1", text: "1" },
                { value: "2", text: "2" },
                { value: "3", text: "3" },
              ]}
            />
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
              <Grid
                container
                rowSpacing={2}
                columnSpacing={isMobile ? 2 : 5}
                sx={{ p: "0" }}
              >
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
              </Grid>
            </Grid>
            <Input
              name="upload"
              value={education.upload}
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
