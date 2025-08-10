import axios from "axios";
import { useSelector } from "react-redux";

//This is axios instance we have created
let api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// Define default empty callbacks. These will be updated by the React hook.
let _onUnauthorized = (msg) => console.warn("onUnauthorized callback not set.");
let _onGeneralError = (msg) => console.warn("onGeneralError callback not set.");
let _onLoadingChange = (loading) =>
  console.warn("onLoadingChange callback not set.");

export const setApiCallbacks = ({
  onUnauthorized,
  onGeneralError,
  onLoadingChange,
}) => {
  if (onUnauthorized) _onUnauthorized = onUnauthorized;
  if (onGeneralError) _onGeneralError = onGeneralError;
  if (onLoadingChange) _onLoadingChange = onLoadingChange;
  // console.log("setApiCallbacks: Callbacks updated."); // Add this log
};

// Axios request interceptors
api.interceptors.request.use(
  (config) => {
    // console.log("request preparation started...");
    let accessToken = sessionStorage.getItem("todoToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    _onLoadingChange(true);
    // console.log("loading started..");
    return config;
  },
  (error) => {
    _onLoadingChange(false);
    // console.log("loading stopped..");
    return Promise.reject(error);
  }
);

// Axios response interceptors
api.interceptors.response.use(
  (response) => {
    if (response.config.url != "/login") _onLoadingChange(false);
    // console.log("loading stopped..");
    return response;
  },
  (error) => {
    _onLoadingChange(false);
    // console.log("loading stopped..");
    console.log(error);
    if (error.response && error.response.status == 401) {
      _onUnauthorized(error.response.data.message);
    } else {
      _onGeneralError(error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
