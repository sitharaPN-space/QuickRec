import { useRef } from "react";
import ButtonComp from "./ButtonComp";
const FileUploader = ({ handleChange, children }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <ButtonComp sx={{ transform: "translate(12px)" }} onClick={handleClick}>
        {children}
      </ButtonComp>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
export default FileUploader;
