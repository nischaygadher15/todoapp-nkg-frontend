import React from "react";
import card1 from "../assets/krishna1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BsClipboardPlus } from "react-icons/bs";

const TaskCategories = () => {
  let navigate2 = useNavigate();

  let catObject = [
    {
      name: "task status",
      list: ["completed", "in progress", "note started"],
    },
    {
      name: "task priority",
      list: ["extreme", "moderate", "low"],
    },
  ];

  return (
    <div className="mx-10 xl:mx-18 h-full rounded-2xl py-5 border border-[#A1A3AB]">
      <div className="flex justify-between items-center px-5">
        <p className="font-semibold flex flex-col">
          <span className="text-xl font-semibold">Task Categories</span>
          <span className="w-20 border-1 border-[#f24e1e]"></span>
        </p>
        <NavLink
          to="/dashboard"
          className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
        >
          Go Back
        </NavLink>
      </div>

      <div className="mt-5 ms-5 mb-10">
        <NavLink
          to="/createcat"
          className="py-1.5 px-5 bg-[#f24e1e] text-white rounded-sm cursor-pointer"
        >
          Add Category
        </NavLink>
      </div>

      <div>
        {/* Category List */}
        {catObject.map((category, inx) => {
          return (
            <div
              key={`catogory-${inx}`}
              className="border-b-1 border-[#A1A3AB] px-5 pb-7 mb-7"
            >
              {/* Category Heading */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold flex flex-col">
                  <span className="text-base capitalize">{category.name}</span>
                  <span className="w-20 border-1 border-[#f24e1e]"></span>
                </p>
                <div>
                  <button
                    type="button"
                    className="py-0.5 px-2 flex items-center gap-1 border border-transparent hover:border-[#FF6767] rounded-md"
                  >
                    <span className="text-xl text-[#FF6767] font-semibold">
                      +
                    </span>
                    <span className="text-[#A6A8B0]">
                      Add {`${category.name}`}
                    </span>
                  </button>
                </div>
              </div>

              {/* Category Table */}
              <table className="w-full catTabel">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.list.map((cat, inx) => {
                    return (
                      <tr key={`category-list-${inx}`}>
                        <td className="w-[10%]">{inx + 1}</td>
                        <td className="w-[50%] capitalize">{cat}</td>
                        <td className="w-[40%]">
                          <div className="w-full flex justify-center gap-7">
                            <button
                              type="submit"
                              className="py-1.5 px-5 bg-[#f24e1e] text-white flex items-center gap-1 rounded-sm cursor-pointer"
                              onClick={() => navigate2("/editcat")}
                            >
                              <RiEdit2Fill className="text-white text-xl" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="submit"
                              className="py-1.5 px-5 bg-[#f24e1e] text-white flex items-center gap-1 rounded-sm cursor-pointer"
                            >
                              <MdDelete className="text-white text-xl" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCategories;
