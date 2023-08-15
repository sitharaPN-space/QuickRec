import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Vacancy from "../../components/Vacancy";
import { getVacanciesBySearch } from "../../api";
import { useGetVacanciesQuery } from "../../state/api";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VacancyList = () => {
  const [isNavbar, setIsNavBar] = useOutletContext();
  const query = useQuery();
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [search, setSearch] = useState("");
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const { data, isLoading } = useGetVacanciesQuery();
  console.log(
    "🚀 ~ file: VacancyList.jsx:48 ~ VacancyList ~ vacancyList:",
    data
  );

  useEffect(() => {
    setIsNavBar(true);
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchVacancy();
    }
  };

  const searchVacancy = async () => {
    if (search.trim()) {
      const result = await getVacanciesBySearch({ search });
      console.log(result);
    } else {
      navigate("/");
    }
  };

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
          <TextField
            sx={{
              flex: 1,
              border: "none",
              width: "75%",
              variant: "filled",
              background: "#fff",
              border: `1px solid ${theme.palette.primary[500]}`,
              borderRadius: "5px",
            }}
            name="search"
            value={search}
            placeholder="Search..."
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={searchVacancy}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* </Paper> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {data || !isLoading ? (
            data.data.map((vacancy) => {
              return <Vacancy key={vacancy.VacancyId} detail={vacancy} />;
            })
          ) : (
            <>{console.log("Loading...")}</>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
