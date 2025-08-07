import React from "react";
import { NavLink } from "react-router-dom";

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
        <ul className="ps-5 flex flex-col gap-3 list-disc">
          <li>
            <NavLink to="/accinfo" className="text-blue-600 font-semibold">
              Account Info
            </NavLink>
          </li>
          <li>
            <NavLink to="/changepwd" className="text-blue-600 font-semibold">
              Change Password
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
