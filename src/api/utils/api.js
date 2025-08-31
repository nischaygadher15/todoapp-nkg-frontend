import axios from "axios";
import { getNewAccessToken } from "./refreshToken";
import { MyStore } from "../../store";
import { setRefreshing, updateToken } from "../../Redux/tokenSclice";
import { setAuth, setUser } from "../../Redux/userSlice";
import { toast } from "react-toastify";

// Axios instance
let api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    let accessToken = sessionStorage.getItem("todoToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.isTokenExpired &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // prevent infinite loop

      MyStore.dispatch(setRefreshing(true));
      MyStore.dispatch(updateToken(null));
      MyStore.dispatch(setUser(null));
      MyStore.dispatch(setAuth(false));
      sessionStorage.removeItem("todoToken");
      sessionStorage.removeItem("todoUser");

      console.log("Access token expired → refreshing...");
      const newToken = await getNewAccessToken();

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    } else {
      MyStore.dispatch(setAuth(false));
    }

    // Any other error
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
