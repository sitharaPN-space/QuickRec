import React, { useState, useRef } from "react";
import {
  Grid,
  TextField,
  useTheme,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachmentIcon from "@mui/icons-material/Attachment";

const FileUploader = ({ label, isMobile, setFile }) => {
  const inputFile = useRef(null);
  const theme = useTheme();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Grid item sm={4} sx={{ textAlign: "left" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
        {label}
      </Typography>
      {/* <UploadFileIcon /> */}
      <TextField
        sx={{
          // p: "4px",
          backgroundColor: theme.palette.background.main,
          // border: `1px solid ${theme.palette.secondary[600]}`,
          // width: "300px",
          "& .MuiInputBase-root": {
            paddingRight: 0,
          },
          "& .MuiButtonBase-root": {
            background: theme.palette.primary[500],
            borderRadius: "0 4px 4px 0",
            // borderTopRightRadius: "4px",
            // borderBottomRightRadius: "4px"
          },
        }}
        type="file"
        accept=".png, .jpg, .jpeg, .pdf"
        size="small"
        ref={inputFile}
        InputProps={
          !isMobile && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    inputFile.current.click();
                  }}
                >
                  <AttachmentIcon sx={{ color: "white", width: "48px" }} />
                </IconButton>
              </InputAdornment>
            ),
          }
        }
        onChange={handleFileChange}
      >
        {/* <Input
            id="image_uploads"
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg, .pdf"
            ref={inputFile}
            sx={{ display: "none" }}
          /> */}
      </TextField>
    </Grid>
  );
};

export default FileUploader;
