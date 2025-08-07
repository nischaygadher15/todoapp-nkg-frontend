import React from "react";
import loader from "../assets/loader_50x50.gif";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center 
    bg-[rgba(255,255,255,0.7)] z-[9999]"
    >
      <img src={loader} alt="Loader SVG" />
    </div>
  );
};

export default Loader;
