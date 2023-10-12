import { useEffect, useRef, useState } from "react";
import { Typography, Container, Paper, Grid } from "@mui/material";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDataOnSuccess, getUserDataOnFailiure } from "../../state/Auth";
import * as api from "../../api/";
import Error from "../../components/Error";

const initState = { userName: "", password: "" };

const SignIn = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initState);
  const [error, setError] = useState();
  const inputRef = useRef();
  const [googleLoginWidth, setGoogleLoginWidth] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setGoogleLoginWidth(inputRef.current?.offsetWidth);
  }, [setGoogleLoginWidth]);

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.signin(loginData);
      localStorage.setItem("profile", data.token);
      dispatch(getUserDataOnSuccess());
      navigate("/home");
    } catch (error) {
      dispatch(getUserDataOnFailiure(error.response.data));
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    localStorage.setItem("profile", token);
    try {
      dispatch(getUserDataOnSuccess());
      navigate("/home");
    } catch (error) {
      dispatch(getUserDataOnFailiure(error.response.data));
      setError(error.response.data);
      console.log(error);
    }
  };
  const googleError = (err) => {
    console.log("Google Sign In was unsuccessful. Try again later");
    console.log(err);
  };
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
        <form onSubmit={handleSubmit}>
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
              <ButtonComp
                type="submit"
                fullWidth
                ref={inputRef}
                variant="contained"
              >
                Sign In
              </ButtonComp>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", textAlign: "center" }}
            >
              <Typography sx={{ fontSize: "0.8rem" }}>-- or --</Typography>
            </Grid>
            <Grid item xs={12}>
              <GoogleLogin
                width={googleLoginWidth}
                onSuccess={googleSuccess}
                onFailure={googleError}
              />
            </Grid>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
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
            <Error error={error} setError={setError} />
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
