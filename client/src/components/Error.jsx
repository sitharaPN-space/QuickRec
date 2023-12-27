import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Error = ({ error, setError }) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (error !== null) {
      setFadeIn(true);
      setTimeout(() => setFadeIn(false), 5000);
      setTimeout(() => setError(null), 5500);
    }
  }, [error, setError]);

  return (
    <Grid item xs={12}>
      <Typography
        sx={{
          display: !error && "none",
          fontSize: "0.8rem",
          m: "1rem auto",
          p: "1rem",
          color: "#ff0000",
          border: "1px solid #ff0000",
          borderRadius: "5px",
        }}
      >
        {error?.message}
      </Typography>
    </Grid>
  );
};

export default Error;
