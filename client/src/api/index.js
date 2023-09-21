import axios from "axios";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
});

export const signin = async (loginData) => {
  const response = await API.post("user/signin", loginData, config);
  return response.data;
};

export const signup = async (userData) => {
  const response = await API.post("user/signup", userData, config);
  return response.data;
};
