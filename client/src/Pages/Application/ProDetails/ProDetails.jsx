import { useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const ProDetails = () => {
  const [details, setDetails, activeStep, setActiveStep] = useOutletContext();

  useEffect(() => setActiveStep(2), []);

  return <div>ProDetails</div>;
};

export default ProDetails;
