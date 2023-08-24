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
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetVacanciesQuery,
  useGetVacancyBySearchQuery,
} from "../../state/api";

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

  const { data: searchVacancyList, isLoading: vacancySearchLoading } =
    useGetVacancyBySearchQuery(search) || {};

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
          {searchVacancyList && !vacancySearchLoading ? (
            searchVacancyList.data.map((vacancy) => {
              return <Vacancy key={vacancy.VacancyId} detail={vacancy} />;
            })
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size="5rem" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
