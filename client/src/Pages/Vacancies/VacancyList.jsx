import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Vacancy from "../../components/Vacancy";

const detail = {
  vacancyId: 1234,
  title: "Deputy General Manager",
  status: "Open",
  recType: "External Recrutiement",
  closingDate: "2023 sep 20",
  slaryGroup: "HM 1-1",
  boardGrade: "G2",
  advertisement: "/path",
  NoOfApplied: "7",
  postedDays: 2,
};

const VacancyList = () => {
  const [isNavbar, setIsNavBar] = useOutletContext();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  useEffect(() => {
    setIsNavBar(true);
  }, []);

  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <Container component="main" maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              mb: "1rem",
            }}
          >
            Available Opportunities
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "75%",
              backgroundcolor: theme.palette.background.main,
            }}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Vacancy detail={detail} />
          <Vacancy detail={detail} />
          <Vacancy detail={detail} />
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
