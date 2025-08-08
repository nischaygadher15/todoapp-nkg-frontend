import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { setUser, setAuth, setLoginLoading } from "../Redux/userSlice.js";
import { toast } from "react-toastify";
import { updateToken } from "../Redux/tokenSclice.js";

const ProtectedRoute = ({ children }) => {
  let dispatch = useDispatch();
  let token =
    useSelector((state) => state.tokenBucket.token) ??
    sessionStorage.getItem("todoToken");
  let loading = useSelector((state) => state.user.loginLoading);
  let auth = useSelector((state) => state.user.auth.isAuthenticated);

  let clearUserData = () => {
    dispatch(updateToken(null));
    dispatch(setUser(null));
    dispatch(setAuth(false));
    sessionStorage.removeItem("todoToken");
    sessionStorage.removeItem("todoUser");
  };

  useEffect(() => {
    let verifyToken = async () => {
      dispatch(setLoginLoading(true));
      if (token != null) {
        try {
          let { data } = await axios.post(
            "http://localhost:3000/auth",
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(data);
          if (data.isAuthenticated) {
            dispatch(setUser(data.data));
            dispatch(setAuth(true));
          } else {
            clearUserData();
            toast.error("Something went wrong.");
          }
        } catch (error) {
          console.log(error);
          clearUserData();
          if (error.response && error.response.status == 401) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
        } finally {
          dispatch(setLoginLoading(false));
        }
      } else {
        clearUserData();
        dispatch(setLoginLoading(false));
      }
    };

    verifyToken();
  }, [token, dispatch]);

  if (loading) return <Loader />;

  if (!auth) {
    // console.log("Redirected to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
