import React from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Settings = () => {
  return (
    <div className="mx-10 xl:mx-18 border border-[#A1A3AB] h-full rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold flex flex-col">
          <span className="text-xl">Settings</span>
          <span className="w-full border-1 border-[#f24e1e]"></span>
        </p>
      </div>
      <div>
        <ul className="flex flex-col gap-3">
          <li>
            <NavLink to="/accinfo" className="min-w-full">
              <div className="w-full flex justify-between items-center bg-[#FF6767] py-2 px-4 rounded-md text-white font-semibold">
                <p>Change Account Information</p>
                <MdKeyboardArrowRight className="text-xl" />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/changepwd" className="min-w-full">
              <div className="w-full flex justify-between items-center bg-[#FF6767] py-2 px-4 rounded-md text-white font-semibold">
                <p>Change Password</p>
                <MdKeyboardArrowRight className="text-xl" />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
