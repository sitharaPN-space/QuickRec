import { useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

const Declaration = () => {
  const [details, setDetails, activeStep, setActiveStep] = useOutletContext();

  useEffect(() => setActiveStep(4), []);

  return <div>Declaration</div>;
};

export default Declaration;
