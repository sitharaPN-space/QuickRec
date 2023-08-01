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
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const DetailCard = ({ detail, onDelete, onEdit }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  const getDate = (date) => {
    const fromDate = date.$d.toDateString().split(" ");
    return `${fromDate[1] ?? ""} ${fromDate[3] ?? ""}`;
  };

  return (
    <Card sx={{ width: "100%", textAlign: "left", mb: "2px" }}>
      <CardHeader
        sx={{ pb: "0" }}
        title={detail.institute ?? detail.title}
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
              {detail.feild && `Specialized in ${detail.feild}`}
            </Typography>
          </Grid>
          {detail.startDate && detail.endDate && (
            <Grid item xs={12}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                From {getDate(detail.startDate)} to {getDate(detail.endDate)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
