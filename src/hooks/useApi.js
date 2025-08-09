import React, { useEffect } from "react";
import api, { configureApi } from "../api/utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../Redux/tokenSclice";
import { setAuth, setUser } from "../Redux/userSlice";
import { setIsLoading } from "../Redux/loaderSlice";

const useApi = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    configureApi({
      onUnauthorized: (msg) => {
        dispatch(updateToken(null));
        dispatch(setUser(null));
        dispatch(setAuth(false));
        sessionStorage.removeItem("todoToken");
        sessionStorage.removeItem("todoUser");
        navigate("/login");
        toast.error(msg);
      },
      onGeneralError: (msg) => toast.error(msg),
      onLoadingChange: (loading) => dispatch(setIsLoading(loading)),
    });
  }, [dispatch, navigate]);

  return { api };
};

export default useApi;
