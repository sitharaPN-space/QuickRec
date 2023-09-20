import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const DetailCard = ({ detail, onDelete, onEdit }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Card sx={{ width: "100%", textAlign: "left", mb: "2px" }}>
      <CardHeader
        sx={{ pb: "0" }}
        title={detail.instituteName ?? detail.title}
        titleTypographyProps={{
          fontSize: (isMobile) => (isMobile ? "1.2rem" : "1.5rem"),
          fontWeight: 600,
        }}
        action={
          <div>
            <IconButton
              sx={{ color: theme.palette.secondary[900] }}
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              sx={{ color: theme.palette.secondary[900] }}
              onClick={onEdit}
            >
              <EditNoteIcon />
            </IconButton>
          </div>
        }
      />
      <CardContent
        sx={{ fontWeight: 550, color: theme.palette.secondary[800] }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={isMobile ? 12 : 5}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              {detail.qualification ?? detail.organization}
            </Typography>
          </Grid>
          <Grid item xs={isMobile ? 12 : 7}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              {detail.fieldOfStudy && `Specialized in ${detail.fieldOfStudy}`}
            </Typography>
          </Grid>
          {detail.startDate && detail.endDate && (
            <Grid item xs={12}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                From {dayjs(detail.startDate).format("MMMM YYYY")} to{" "}
                {dayjs(detail.endDate).format("MMMM YYYY")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
