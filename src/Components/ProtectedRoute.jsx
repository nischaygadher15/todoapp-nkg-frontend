import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { setUser, setAuth, setLoginLoading } from "../Redux/userSlice.js";
import { toast } from "react-toastify";
import { setRefreshing, updateToken } from "../Redux/tokenSclice.js";
import { verifyAuth } from "../api/user/user-api.js";
import { MyStore } from "../store.js";
import { getNewAccessToken } from "../api/utils/refreshToken.js";

const ProtectedRoute = ({ children }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let token = useSelector((state) => state.tokenBucket.token);
  let loading = useSelector((state) => state.user.loginLoading);
  let auth = useSelector((state) => state.user.auth.isAuthenticated);
  let isRefreshing = useSelector((state) => state.tokenBucket.isRefreshing);

  let clearUserData = () => {
    sessionStorage.removeItem("todoUser");
    sessionStorage.removeItem("todoToken");
    sessionStorage.removeItem("todoUserId");
    dispatch(updateToken(null));
    dispatch(setUser(null));
    dispatch(setAuth(false));
  };

  useEffect(() => {
    if (isRefreshing || !token) {
      return;
    }
    dispatch(setLoginLoading(true));
    // console.log(token);
    let verifyToken = async () => {
      try {
        let res = await verifyAuth();
        // console.log("Auth:", res);
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

  if (!auth && !isRefreshing) {
    console.log(
      "NO AUTH:",
      !isRefreshing,
      !token,
      !auth,
      sessionStorage.getItem("todoUserId")
    );

    if (!token && !auth && sessionStorage.getItem("todoUserId")) {
      // MyStore.dispatch(setRefreshing(true));

      let getRefresh = async () => {
        console.log("no token or page refreshed → refreshing...");
        let newTokenResp = await getNewAccessToken();
        console.log(newTokenResp);

        if (!newTokenResp.success) {
          navigate("/login", { replace: true });
          toast.error(newTokenResp.message);
        }
      };

      getRefresh();
    } else {
      console.log("Redirected to /login-Protected route");
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
