import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SginUp";
import Application from "./Pages/Application/ApplicationLayout";
import VacancyList from "./Pages/Vacancies/VacancyList";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import BasicDetails from "./Pages/Application/BasicDetails/BasicDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EduDetails from "./Pages/Application/EduDetails/EduDetails";
import ProDetails from "./Pages/Application/ProDetails/ProDetails";
import Declaration from "./Pages/Application/Declaration/Declaration";
import OtherDetails from "./Pages/Application/OtherDetails/OtherDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/signIn" replace />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<VacancyList />} />
        <Route path="/application" element={<Application />}>
          <Route path="/application/basicDetails" element={<BasicDetails />} />
          <Route path="/application/eduDetails" element={<EduDetails />} />
          <Route path="/application/proDetails" element={<ProDetails />} />
          <Route path="/application/otherDetails" element={<OtherDetails />} />
          <Route path="/application/declaration" element={<Declaration />} />
        </Route>
      </Route>
    )
  );
  return (
    <div>
      {/* <BrowserRouter> */}
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          <CssBaseline />
          {/* <Routes>
          </Routes> */}
        </LocalizationProvider>
      </ThemeProvider>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
