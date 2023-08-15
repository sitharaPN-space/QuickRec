import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Vacancy from "../../components/Vacancy";

const { vacancies } = require("./vacancies.json");

const VacancyList = () => {
  const [vacancyList, setVacancyList] = useState(vacancies);
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();

  const handleSearch = (vacancies, query) => {
    const filteredVacancies = vacancies.filter((vacancy) =>
      vacancy.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(...query.toLowerCase().split(" ")))
    );
    setVacancyList(query.length > 0 ? filteredVacancies : vacancies);
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
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(vacancies, searchText);
                }
              }}
              placeholder="Search..."
            />
            <IconButton onClick={() => handleSearch(vacancies, searchText)}>
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
          {vacancyList.map((detail, i) => (
            <Vacancy key={i} detail={detail} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
