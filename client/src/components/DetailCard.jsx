import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ButtonComp from "./ButtonComp";

const DetailCard = ({ detail }) => {
  const subTitle = `Posted days ago`;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  const getDate = (date) => {
    const [day, month, dd, year] = date.$d.toDateString().split(" ");
    return month + " " + year;
  };

  const handleClick = () => {};

  return (
    <Card sx={{ width: "100%", textAlign: "left", mb: "2px" }}>
      <CardHeader
        title={detail.institute}
        // sx={{ backgroundColor: theme.palette.secondary[400], p: "12px" }}s

        titleTypographyProps={{
          fontSize: (isMobile) => (isMobile ? "1.2rem" : "1.5rem"),
          fontWeight: 600,
          height: "10px",
        }}
      />
      <CardContent
        sx={{ fontWeight: 550, color: theme.palette.secondary[800] }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={isMobile ? 12 : 4}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              {detail.qualification}
            </Typography>
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              Specialized in {detail.feild}
            </Typography>
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              From {getDate(detail.startDate)} to {getDate(detail.endDate)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
