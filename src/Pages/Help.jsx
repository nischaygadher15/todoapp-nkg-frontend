import React from "react";

const Help = () => {
  return (
    <div className="mx-10 xl:mx-18 border border-[#A1A3AB] h-full rounded-2xl p-5">
      <div className="flex justify-center items-center gap-3 mb-10">
        <img
          src="./src/assets/checkFavicaon.svg"
          alt="Check SVG"
          className="w-10 h-10"
        />
        <p className="text-center text-4xl">
          <span className="font-semibold text-[#FF6767]">To-</span>
          Do
        </p>
      </div>
      <div className="w-full px-24">
        <p className="text-xl mb-2">
          <span className="font-semibold">Version:</span> 1.0.0
        </p>

        <p className="text-xl mb-2">
          <span className="font-semibold">Design By:</span> To-do List Web App
          Design (Community) - Figma
        </p>

        <p className="text-xl mb-2">
          <span className="font-semibold">Developed By:</span> Nischay K. Gadher
        </p>
      </div>
    </div>
  );
};

export default Help;
