import React from "react";
import loader from "../assets/loader_50x50.gif";
import logo from "../assets/logo/check-mark-button-svgrepo-com (0).svg";
import { LinearProgress } from "@mui/material";

const FastLinearProgress = () => {
  return (
    <LinearProgress
      sx={{
        "& .MuiLinearProgress-bar": {
          backgroundColor: "#FF6767",
          animationDuration: "600ms",
        },
        backgroundColor: "#EDE6D6",
      }}
    />
  );
};

const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-white
     z-[9999]"
    >
      {/* bg-[rgba(255,255,255,0.7)] */}
      <div className="flex flex-col justify-center items-center gap-y-4 -translate-y-2/5">
        <div className="flex justify-center items-center gap-2">
          <img src={logo} alt="Check SVG" className="w-10 h-10" />
          <p className="text-center text-4xl">
            <span className="font-semibold text-[#FF6767]">To-</span>
            Do
          </p>
        </div>
        {/* <img src={loader} alt="Loader SVG" /> */}
        <div className="w-full">
          <FastLinearProgress />
        </div>
      </div>
    </div>
  );
};

export default Loader;
