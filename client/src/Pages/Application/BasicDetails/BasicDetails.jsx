import { useEffect } from "react";
import { Paper, Grid, useMediaQuery } from "@mui/material";
import Input from "../../../components/Input";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { setApplicationData } from "../../../state/UserApplication";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
} from "../../../state/api";

const BasicDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const user = useSelector((state) => state.userContext.data);
  const [createAppBasicDetails] = useCreateAppBasicDetailsMutation();
  const { data: appBasicDetails, isLoading: detailsLoading } =
    useGetAppBasicDetailsQuery({
      userId: user.result.UserId,
    });
  const [setActiveStep] = useOutletContext();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { basicDetails } = useSelector((state) => state.userApplication);
  const navigate = useNavigate();

  useEffect(() => setActiveStep(0), [setActiveStep]);
  useEffect(() => {
    !detailsLoading &&
      dispatch(
        setApplicationData({
          basicDetails: appBasicDetails?.data,
        })
      );
  }, [dispatch, appBasicDetails?.data, detailsLoading]);

  const handleNext = (e) => {
    e.preventDefault();
    try {
      createAppBasicDetails({
        ...basicDetails,
        vacancyId: state.vacancyId,
        userId: user.result.UserId,
      });
      navigate("/application/eduDetails", { state });
    } catch (error) {}
  };
  const handleChange = (e) => {
    dispatch(
      setApplicationData({
        basicDetails: {
          ...basicDetails,
          [e.target.name]: e.target.value,
        },
      })
    );
  };
  return (
    <Paper
      sx={{
        display: "flex",
      }}
    >
      <form id="application" onSubmit={handleNext}>
        <Grid container spacing={2} sx={{ p: "1.5rem" }}>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <Input
              name="title"
              type="select"
              label="Title *"
              required
              half
              value={basicDetails.title}
              handleChange={handleChange}
              options={[
                { value: "Mr.", text: "Mr." },
                { value: "Mrs.", text: "Mrs." },
                { value: "Miss.", text: "Miss." },
              ]}
            />
          </Grid>
          <Input
            name="nameWithInitials"
            value={basicDetails.nameWithInitials}
            label="Name with initials *"
            handleChange={handleChange}
            required
          />
          <Input
            name="nameDenotedbyInit"
            value={basicDetails.nameDenotedbyInit}
            label="Name denoted by initials"
            handleChange={handleChange}
          />
          <Input
            name="otherName"
            value={basicDetails.otherName}
            label="Other Names"
            handleChange={handleChange}
          />
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
              <Input
                name="nic"
                value={basicDetails.nic}
                label="National identity Card (NIC) *"
                handleChange={handleChange}
                required
                half
              />
              <Input
                name="dateOfBirth"
                type="date"
                value={basicDetails.dateOfBirth}
                handleChange={handleChange}
                label="Date of Birth *"
                required
                half
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Input
                  name="sex"
                  type="select"
                  label="Sex *"
                  required
                  value={basicDetails.sex}
                  handleChange={handleChange}
                  options={[
                    { value: "Male", text: "Male" },
                    { value: "Female", text: "Female" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Input
                  name="civilStatus"
                  type="select"
                  label="Civil Status *"
                  required
                  value={basicDetails.civilStatus}
                  handleChange={handleChange}
                  options={[
                    { value: "Single", text: "Single" },
                    { value: "Married", text: "Married" },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Input
            name="addressLine1"
            value={basicDetails.addressLine1}
            label="Permenant Address line 1 *"
            handleChange={handleChange}
            required
          />
          <Input
            name="addressLine2"
            value={basicDetails.addressLine2}
            label="Permenant Address line 2 "
            handleChange={handleChange}
          />
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Input
                  name="nationality"
                  type="select"
                  label="Nationality *"
                  required
                  value={basicDetails.nationality}
                  handleChange={handleChange}
                  options={[
                    { value: "Sri Lankan", text: "Sri Lankan" },
                    { value: "Indian", text: "Indian" },
                    { value: "Japanese", text: "Japanese" },
                    { value: "Chinese", text: "Chinese" },
                    { value: "Other", text: "Other" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Input
                  name="religion"
                  type="select"
                  label="Religion *"
                  required
                  value={basicDetails.religion}
                  handleChange={handleChange}
                  options={[
                    { value: "Buddhist", text: "Buddhist" },
                    { value: "Hindu", text: "Hindu" },
                    { value: "Christianity", text: "Christianity" },
                    { value: "Islam", text: "Islam" },
                    { value: "Other", text: "Other" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
                <Input
                  name="ethnicity"
                  type="select"
                  label="Ethnicity *"
                  required
                  value={basicDetails.ethnicity}
                  handleChange={handleChange}
                  options={[
                    { value: "Sinhala", text: "Sinhala" },
                    { value: "Tamil", text: "Tamil" },
                    { value: "Muslim", text: "Muslim" },
                    { value: "Malay", text: "Malay" },
                    { value: "Burger", text: "Burger" },
                    { value: "Other", text: "Other" },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Input
            name="mobileNo1"
            value={basicDetails.mobileNo1}
            label="Mobile No 1 *"
            handleChange={handleChange}
            required
            half
          />
          <Input
            name="mobileNo2"
            value={basicDetails.mobileNo2}
            label="Mobile No 2"
            handleChange={handleChange}
            half
          />
          <Input
            name="email"
            value={basicDetails.email}
            label="Email Address *"
            handleChange={handleChange}
            required
            half
            type="email"
          />
          {!isMobile && (
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <div style={{ textAlign: "right" }}>
                <ButtonComp type="submit" sx={{ mt: "1rem" }}>
                  Save & Next
                </ButtonComp>
              </div>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default BasicDetails;
