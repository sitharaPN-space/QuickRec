import React, { useState } from "react";
import { Input, Button, useTheme } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const theme = useTheme();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div>
        {/* <UploadFileIcon /> */}
        <Button
          sx={{
            p: "4px",
            backgroundColor: theme.palette.background.main,
            border: `1px solid ${theme.palette.secondary[600]}`,
            width: "100%",
          }}
        >
          <Input
            id="image_uploads"
            type="file"
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg, .pdf"
            // sx={{ display: "none" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
