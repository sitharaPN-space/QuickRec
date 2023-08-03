import {
  Route,
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
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EduDetails from "./Pages/Application/EduDetails/EduDetails";
import ProDetails from "./Pages/Application/ProDetails/ProDetails";
import Declaration from "./Pages/Application/Declaration/Declaration";
import OtherDetails from "./Pages/Application/OtherDetails/OtherDetails";

function App() {
  const user = useSelector((state) => state.userContext.data?.result);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={user ? <Navigate to="/home" replace /> : <Layout />}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        <Route element={user ? <Layout /> : <Navigate to="/signIn" replace />}>
          <Route path="/*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<VacancyList />} />
          <Route path="/application" element={<Application />}>
            <Route
              path="/application/basicDetails"
              element={<BasicDetails />}
            />
            <Route path="/application/eduDetails" element={<EduDetails />} />
            <Route path="/application/proDetails" element={<ProDetails />} />
            <Route
              path="/application/otherDetails"
              element={<OtherDetails />}
            />
            <Route path="/application/declaration" element={<Declaration />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          <CssBaseline />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
