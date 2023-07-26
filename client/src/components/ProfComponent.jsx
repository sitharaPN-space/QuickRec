import React from "react";
import {
  Card,
  Typography,
  useTheme,
  CardContent,
  CardHeader,
  Button,
  IconButton,
  Paper,
  Link,
  CardActions,
} from "@mui/material";
import TimelineDot from "@mui/lab/TimelineDot";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import moment from "moment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProfComponent = ({ profDetail, isActive }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      sx={{
        textAlign: "left",
        borderBottom: `4px solid ${theme.palette.secondary[500]}`,
      }}
    >
      {/* <IconButton sx={{ borderRadius: 0, width: "100%", p: 0, m: 0 }}> */}
      <CardContent>
        <div
          style={{
            display: "flex",
            marginBottom: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4">{profDetail.title}</Typography>
            <Typography variant="h5" color={theme.palette.secondary[600]}>
              {profDetail.organization}
            </Typography>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconButton>
              <EditNoteIcon sx={{ width: 28, height: 28 }} />
            </IconButton>
            <IconButton>
              <DeleteIcon sx={{ width: 28, height: 28 }} />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
            <Typography variant="common">
              {`${new Date(profDetail.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} - ${new Date(profDetail.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
            </Typography>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Typography variant="common">attachment</Typography>
              <IconButton>
                <DescriptionOutlinedIcon
                  sx={{
                    color: theme.palette.primary[500],
                    width: 28,
                    height: 24,
                  }}
                />
              </IconButton>
            </div>
          </div>
          <CardActions>
            <Typography variant="common" color={theme.palette.primary[500]}>
              see more...
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="common">{profDetail.description}</Typography>
          </CardContent>
        </Collapse>
      </CardContent>
      {/* </IconButton> */}
    </Paper>
  );
};

export default ProfComponent;
