import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SginUp";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/signIn" replace />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
