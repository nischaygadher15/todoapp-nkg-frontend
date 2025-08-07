import React from "react";
import card1 from "../assets/krishna1.jpg";
import { NavLink } from "react-router-dom";

const ChangeUserPassword = () => {
  return (
    <div className="mx-10 xl:mx-18 h-full rounded-2xl p-5 border border-[#A1A3AB]">
      <div className="flex justify-between items-center">
        <p className="font-semibold flex flex-col">
          <span className="text-xl">Change Password</span>
          <span className="w-20 border-1 border-[#f24e1e]"></span>
        </p>
        <NavLink
          to="/settings"
          className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
        >
          Go Back
        </NavLink>
      </div>

      <div className="flex items-center gap-3 my-7">
        <img
          src={card1}
          alt="User Photo"
          className="w-[70px] h-[70px] rounded-full"
        />
        <div>
          <p className="font-semibold text-lg">Username</p>
          <p className="text-sm">user email id</p>
        </div>
      </div>

      <form className="border border-[#A1A3AB] p-7 rounded-lg">
        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="curpwd"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newpwd"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
          />
        </div>

        <div className="flex flex-col mb-7">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confpwd"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
          />
        </div>

        <div className="flex gap-3 mb-24">
          <button
            type="submit"
            className="py-1.5 px-5 bg-[#f24e1e] text-white rounded-sm cursor-pointer"
          >
            Update Password
          </button>
          <button
            type="reset"
            className="py-1.5 px-5 bg-[#f24e1e] text-white rounded-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPassword;
