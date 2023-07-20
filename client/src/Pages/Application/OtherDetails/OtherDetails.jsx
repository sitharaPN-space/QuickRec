import { useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const OtherDetails = () => {
  const [details, setDetails, activeStep, setActiveStep] = useOutletContext();

  useEffect(() => setActiveStep(3), []);

  return <div>OtherDetails</div>;
};

export default OtherDetails;
