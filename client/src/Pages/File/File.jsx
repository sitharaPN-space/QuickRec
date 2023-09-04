import { useParams } from "react-router-dom";

const File = () => {
  const { file } = useParams();

  return (
    <iframe
      src={
        `blob:${window.location.protocol}//${window.location.hostname}:${window.location.port}/` +
        file
      }
      frameBorder={0}
      title={file}
      width="100%"
      style={{ position: "fixed", top: 0, height: "100vh" }}
    ></iframe>
  );
};
export default File;
