import React, { useEffect } from "react";
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
import Input from "../../../components/Input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ButtonComp from "../../../components/ButtonComp";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const BasicDetails = ({}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, details, setDetails, setActiveStep] = useOutletContext();
  const navigate = useNavigate();
  const { basicDetails } = details;

  useEffect(() => setActiveStep(0), []);

  const handleNext = () => {
    navigate("/application/eduDetails", state);
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      basicDetails: {
        ...basicDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Paper
      sx={{
        display: "flex",
      }}
    >
      <Grid container spacing={2} sx={{ p: "1.5rem" }}>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
            Title *
          </Typography>
          <FormControl size="small">
            <Select
              name="title"
              value={basicDetails.title}
              onChange={handleChange}
              sx={{
                minWidth: "140px",
                minHeight: "1.4rem",
                backgroundColor: (theme) => theme.palette.background.main,
              }}
            >
              <MenuItem value={1}>Mr.</MenuItem>
              <MenuItem value={2}>Mrs.</MenuItem>
              <MenuItem value={3}>Miss.</MenuItem>
            </Select>
          </FormControl>
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

            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Date of Birth *
              </Typography>
              <DatePicker
                value={basicDetails.dateOfBirth}
                onChange={(newValue) => {
                  handleChange({
                    target: {
                      name: "dateOfBirth",
                      value: newValue,
                      // value: newValue.$d.toLocaleDateString(),
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
          <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
            <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Sex *
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="sex"
                  value={basicDetails.sex}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Civil Status *
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="civilStatus"
                  value={basicDetails.civilStatus}
                  onChange={handleChange}
                  sx={{
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>Single</MenuItem>
                  <MenuItem value={2}>Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Input
          name="AddressLine1"
          value={basicDetails.AddressLine1}
          label="Permenant Address line 1 *"
          handleChange={handleChange}
          required
        />
        <Input
          name="AddressLine2"
          value={basicDetails.AddressLine2}
          label="Permenant Address line 2 "
          handleChange={handleChange}
        />
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Grid container spacing={isMobile ? 2 : 5} sx={{ p: "0" }}>
            <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Nationality *
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="nationality"
                  value={basicDetails.nationality}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>Sri Lankan</MenuItem>
                  <MenuItem value={2}>Indian</MenuItem>
                  <MenuItem value={3}>Japanese</MenuItem>
                  <MenuItem value={4}>Chinease</MenuItem>
                  <MenuItem value={5}>Other </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Religion *
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="religion"
                  value={basicDetails.religion}
                  onChange={handleChange}
                  sx={{
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>Buddhism</MenuItem>
                  <MenuItem value={2}>Hindu</MenuItem>
                  <MenuItem value={3}>Christianity </MenuItem>
                  <MenuItem value={4}>Islam </MenuItem>
                  <MenuItem value={5}>Other </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Ethnicity *
              </Typography>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  name="ethnicity"
                  onChange={handleChange}
                  value={basicDetails.ethnicity}
                  sx={{
                    minHeight: "1.4rem",
                    backgroundColor: (theme) => theme.palette.background.main,
                  }}
                >
                  <MenuItem value={1}>Sinhala</MenuItem>
                  <MenuItem value={2}>Tamil</MenuItem>
                  <MenuItem value={3}>Muslim </MenuItem>
                  <MenuItem value={4}>Malay </MenuItem>
                  <MenuItem value={5}>Burger </MenuItem>
                  <MenuItem value={6}>Other </MenuItem>
                </Select>
              </FormControl>
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
          label="Mobile No 2 *"
          handleChange={handleChange}
          required
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
              <ButtonComp sx={{ mt: "1rem" }} onClick={handleNext}>
                Next
              </ButtonComp>
            </div>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default BasicDetails;
