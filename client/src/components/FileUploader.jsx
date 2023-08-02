import { useRef } from "react";
import ButtonComp from "./ButtonComp";
const FileUploader = ({ handleChange, required, children }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <ButtonComp
        sx={{ transform: "translate(0.85rem)", height: "40px" }}
        onClick={handleClick}
      >
        {children}
      </ButtonComp>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{
          opacity: 0,
          width: "1px",
          position: "absolute",
        }}
        required={required}
      />
    </>
  );
};
export default FileUploader;
