import React from "react";
import { NavLink } from "react-router-dom";

const EditCategory = () => {
  return (
    <div className="mx-10 xl:mx-18 h-full rounded-2xl p-5 border border-[#A1A3AB]">
      <div className="flex justify-between items-center mb-7">
        <p className="font-semibold flex flex-col">
          <span className="text-xl font-semibold">Edit Categories</span>
          <span className="w-20 border-1 border-[#f24e1e]"></span>
        </p>
        <NavLink
          to="/tscategories"
          className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
        >
          Go Back
        </NavLink>
      </div>

      <form className="">
        <div className="flex flex-col mb-2">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Category name
          </label>
          <input
            type="text"
            id="firstname"
            className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
          />
        </div>

        <div className="w-full flex justify-start mt-7 gap-5">
          <button
            type="submit"
            className="py-1.5 px-10 bg-[#f24e1e] text-white flex items-center gap-1 rounded-sm cursor-pointer"
          >
            Save
          </button>
          <button
            type="reset"
            className="py-1.5 px-10 bg-[#f24e1e] text-white flex items-center gap-1 rounded-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
