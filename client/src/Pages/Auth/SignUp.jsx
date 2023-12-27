import { useState } from "react";
import { Typography, Container, Paper, Grid, Checkbox } from "@mui/material";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import { useNavigate } from "react-router-dom";

import * as api from "../../api";
import Error from "../../components/Error";

const initState = {
  userName: "",
  email: "",
  nic: "",
  EmpNo: "",
  IsBoardEmployee: false,
  mobileNo: "",
  password: "",
  confirmPassword: "",
  empNumber: "",
};

const SignUp = () => {
  const [boardEmpCheck, setBoardEmpCheck] = useState(false);
  const [userData, setUserData] = useState(initState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const confirmPasswordMatches = userData.password === userData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.signup(userData);
      navigate("/signin");
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const hadleEmpCheck = () => {
    setBoardEmpCheck(!boardEmpCheck);
  };

  const navigate = useNavigate();

  const switchMode = () => {
    navigate("/signIn");
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ p: "2rem 0" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "1rem",
        }}
        elevation={0}
        variant="outlined"
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Input
              name="userName"
              value={userData.userName}
              label="Name *"
              handleChange={handleChange}
              required
            />
            <Input
              name="email"
              value={userData.email}
              label="Email Address *"
              handleChange={handleChange}
              required
              type="email"
            />
            <Input
              name="nic"
              value={userData.nic}
              label="National Identity No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="mobileNo"
              value={userData.mobileNo}
              label="Mobile No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="password"
              value={userData.password}
              label="Password *"
              handleChange={handleChange}
              handleShowPassword={handleShowPassowrd}
              required
              type={showPassword ? "text" : "password"}
            />
            <Input
              name="confirmPassword"
              value={userData.confirmPassword}
              label="Confirm Password *"
              error={!confirmPasswordMatches}
              helperText={!confirmPasswordMatches && "Password doesn't match."}
              handleChange={handleChange}
              handleShowPassword={handleShowPassowrd}
              required
              type={showPassword ? "text" : "password"}
            />
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox sx={{ ml: "-10px" }} onChange={hadleEmpCheck} />
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                  I am a Board Employee
                </Typography>
              </div>
            </Grid>
            {boardEmpCheck && (
              <Input
                name="empNumber"
                label="Employee Number *"
                handleChange={handleChange}
                required
              />
            )}
            <Grid item xs={12}>
              <ButtonComp
                type="submit"
                disabled={!confirmPasswordMatches}
                fullWidth
                variant="contained"
              >
                create an account
              </ButtonComp>
            </Grid>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
                <Typography
                  sx={{ fontSize: "0.8rem", mt: "1rem", cursor: "pointer" }}
                  onClick={switchMode}
                >
                  Sign in with existing account
                </Typography>
              </Grid>
            </Grid>
            <Error error={error} setError={setError} />
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
