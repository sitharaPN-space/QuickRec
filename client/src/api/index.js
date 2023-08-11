import axios from "axios";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

const API = axios.create({ baseURL: "http://10.0.19.177:5000" });

const signin = async (loginData) => {
  const response = await API.post("user/signin", loginData, config);
  return response.data;
};

const signup = async (userData) => {
  const response = await API.post("user/signup", userData, config);
  return response.data;
};

const saveBasicDetails = async (basicDetails) => {
  const response = await API.post(
    "application/addBasicDetails",
    basicDetails,
    config
  );
  return response.data;
};

const getVacancies = async () => {
  const response = await API.get("common/vacancies", config);
  return response.data;
};

export { getVacancies, saveBasicDetails, signin, signup };
