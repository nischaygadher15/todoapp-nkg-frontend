import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Loader from "./Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "./Redux/loaderSlice";
import useApi from "./hooks/useApi";

function App() {
  let loading = useSelector((state) => state.loader.isLoading);
  let dispatch = useDispatch();
  let location = useLocation();
  const { api } = useApi();

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, [location.pathname]);

  return (
    <div>
      {loading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Outlet />
    </div>
  );
}

export default App;
