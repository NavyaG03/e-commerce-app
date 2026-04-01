import axios from "axios";

const BASE_URL="http://localhost:5000/api/"

export const publicRequest=axios.create({
    baseURL:BASE_URL
})

export const userRequest=axios.create({
    baseURL:BASE_URL,
})

userRequest.interceptors.request.use((config) => {
  const persistRoot = localStorage.getItem("persist:root");
  const token = persistRoot
    ? JSON.parse(JSON.parse(persistRoot).user)?.currentUser?.accessToken
    : null;
  if (token) config.headers.token = `BEARER ${token}`;
  return config;
});