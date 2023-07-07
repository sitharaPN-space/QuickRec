import React, { useState } from "react";
import { Box, Typography, Container, Paper, Grid, Button } from "@mui/material";
import Input from "../../components/Input";
import { useTheme } from "@mui/material/styles";
import ButtonComp from "../../components/ButtonComp";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "../../components/GoogleIcon";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = () => {};
  const handleChange = () => {};

  const googleSuccess = () => {};
  const googleError = () => {};
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
        elevation={0}
        variant="outlined"
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Sign in
        </Typography>
        <form onSubmit={{ handleSubmit }}>
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Input
              name="userName"
              label="Email Address/ Employee No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Password *"
              handleChange={handleChange}
              required
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassowrd}
            />
            <Grid item xs={12}>
              <ButtonComp type="submit" fullWidth variant="contained">
                Sign In
              </ButtonComp>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", textAlign: "center" }}
            >
              <Typography sx={{ fontSize: "0.8rem" }}>
                -- or Sign In with --
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <GoogleLogin
                clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
                render={(renderProps) => (
                  <ButtonComp
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                  >
                    Google Sign In
                  </ButtonComp>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item>
              <Typography
                sx={{ fontSize: "0.8rem", mt: "1rem", cursor: "pointer" }}
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                Sign up to create a new account
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
