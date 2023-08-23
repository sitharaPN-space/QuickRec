import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Vacancy from "../../components/Vacancy";
import { useGetVacancyBySearchQuery } from "../../state/api";

const VacancyList = () => {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { data: searchVacancyList, isLoading: vacancySearchLoading } =
    useGetVacancyBySearchQuery(search);

  const handleSearch = () => {
    setSearch(searchText);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(searchText);
    }
  };
  return (
    <div
      style={{
        backgroundColor: theme.palette.background.main,
        minHeight: "calc(100vh - 164px)",
        paddingBottom: "20px",
      }}
    >
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
              onKeyPress={handleKeyPress}
              placeholder="Search..."
            />
            <IconButton onClick={handleSearch}>
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
          {searchVacancyList && !vacancySearchLoading ? (
            searchVacancyList.data.length > 0 ? (
              searchVacancyList.data.map((vacancy) => {
                return <Vacancy key={vacancy.VacancyId} vacancy={vacancy} />;
              })
            ) : (
              <div
                style={{
                  width: "max-content",
                  height: "200px",
                  margin: "auto",
                }}
              >
                No Results ...
              </div>
            )
          ) : (
            <div style={{ width: "min-content", margin: "auto" }}>
              <CircularProgress size="5rem" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
