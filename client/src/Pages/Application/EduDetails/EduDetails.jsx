import { useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const EduDetails = () => {
  const [details, setDetails, activeStep, setActiveStep] = useOutletContext();

  useEffect(() => setActiveStep(1), []);

  return <div>EduDeatils</div>;
};

export default EduDetails;
