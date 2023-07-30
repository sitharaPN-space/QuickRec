import { styled } from "@mui/material/styles";
import { ListItemButton } from "@mui/material";

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary[900],
  fontWeight: 600,
  fontSize: "20px",
  "&:hover": {
    bakcground: "none",
    borderBottom: `5px solid ${theme.palette.primary[500]}`,
  },
}));

export default ListItemStyle;
