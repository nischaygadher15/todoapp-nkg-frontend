import axios from "axios";

//This is axios instance we have created
let api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export const configureApi = ({
  onUnauthorized,
  onGeneralError,
  onLoadingChange,
}) => {
  api.interceptors.request.use(
    (config) => {
      let token =
        useSelector((state) => state.tokenBucket.token) ??
        sessionStorage.getItem("todoToken");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      onLoadingChange(true);
      return config;
    },
    (error) => {
      onLoadingChange(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      onLoadingChange(false);
      return response;
    },
    (error) => {
      onLoadingChange(false);
      console.log(error);
      if (error.response && error.response.status == 401) {
        onUnauthorized(error.response.data.message);
      } else {
        onGeneralError(error.message);
      }

      return Promise.reject(error);
    }
  );
};

export default api;
