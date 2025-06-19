import axios from "axios";

const instance = axios.create({
  baseURL: "https://mediagaleryapp.onrender.com", 
  withCredentials: true,
});

export default instance;
