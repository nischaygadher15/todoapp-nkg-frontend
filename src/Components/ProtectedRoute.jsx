import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { setUser, setAuth, setLoginLoading } from "../Redux/userSlice.js";
import { toast } from "react-toastify";
import { setRefreshing, updateToken } from "../Redux/tokenSclice.js";
import { verifyAuth } from "../api/user/user-api.js";

const ProtectedRoute = ({ children }) => {
  let dispatch = useDispatch();

  let token = useSelector((state) => state.tokenBucket.token);
  let loading = useSelector((state) => state.user.loginLoading);
  let auth = useSelector((state) => state.user.auth.isAuthenticated);
  let isRefreshing = useSelector((state) => state.tokenBucket.isRefreshing);

  let clearUserData = () => {
    dispatch(updateToken(null));
    dispatch(setUser(null));
    dispatch(setAuth(false));
    sessionStorage.removeItem("todoToken");
    sessionStorage.removeItem("todoUser");
  };

  useEffect(() => {
    if (isRefreshing || !token) {
      return;
    }

    dispatch(setLoginLoading(true));
    console.log(token);
    let verifyToken = async () => {
      try {
        let res = await verifyAuth();
        console.log("Auth:", res);
        if (res.isAuthenticated) {
          dispatch(setUser(res.data));
          dispatch(setAuth(true));
        } else {
          clearUserData();
          toast.error("Something went wrong.");
        }
      } catch (error) {
        clearUserData();
        console.log(error);
        toast.error(error.message);
      } finally {
        dispatch(setLoginLoading(false));
      }
    };

    verifyToken();
  }, [token]);

  if (loading || isRefreshing) return <Loader />;

  if (!auth) {
    console.log("Redirected to /login-Protected route");
    // return <Navigate to="/login" replace />;
    console.log("NO TOKEN", token, auth);
  }

  return children;
};

export default ProtectedRoute;
