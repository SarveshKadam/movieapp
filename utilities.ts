import axios from "axios";

const api_key = "2dca580c2a14b55200e784d157207b4d";
console.log("api_key", api_key);
export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key,
  },
});
