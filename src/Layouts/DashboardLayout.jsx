import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { FaExclamation, FaRegCalendarAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import userphoto from "../assets/krishna1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout, MdOutlineHelp } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { HiMiniListBullet } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { BsExclamationLg } from "react-icons/bs";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../Redux/tokenSclice";
import { toast } from "react-toastify";
import { setAuth, setUser } from "../Redux/userSlice";
import ScrollToTop from "../Components/ScrollToTop";

const DashboardLayout = ({ dashTitle, children }) => {
  let dispatch = useDispatch();
  let navigateVar = useNavigate();
  let username = useSelector((state) => state.user.data.username);
  let useremail = useSelector((state) => state.user.data.useremail);
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednsday",
    "thursday",
    "firday",
    "saturday",
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleNotification = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeNotification = () => {
    setAnchorEl(null);
  };

  let clearUserData = () => {
    sessionStorage.removeItem("todoToken");
    sessionStorage.removeItem("todoUser");
    sessionStorage.removeItem("todoUserId");
    dispatch(updateToken(null));
    dispatch(setUser(null));
    dispatch(setAuth(false));
  };

  let handleLogout = () => {
    clearUserData();
    navigateVar("/login");
    toast.success("You have successfully logged out.");
  };

  return (
    <div className="relative w-full h-full">
      <ScrollToTop />
      {/* Navbar */}
      <header
        className="z-99 fixed top-0 left-0 right-0 flex justify-between items-center bg-[#F8F8F8] py-5 
      shadow-md"
      >
        {/* <p>{props.dashboardTitle}</p> */}
        <p className="min-w-[260px] w-[260px] text-center text-3xl font-semibold">
          {dashTitle}
        </p>

        <div className="flex flex-1 items-center gap-18 px-18">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              className="bg-white w-full px-5 h-9 outline-none rounded-md shadow-md"
              placeholder="Search your task here..."
            />
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 right-0 w-9 h-9 flex justify-center items-center
             bg-[#fc7474] hover:bg-[#FF6767] text-white rounded-md"
            >
              <FiSearch />
            </button>
          </div>
          <nav className="flex items-center">
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div>
                <button
                  type="button"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleNotification}
                  className="outline-none"
                >
                  <div className="bg-[#fc7474] hover:bg-[#FF6767] text-white w-9 h-9 flex items-center justify-center rounded-md">
                    <RiNotification3Line />
                  </div>
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  disableScrollLock
                  onClose={closeNotification}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <div className="min-w-[350px] max-h-[350px]">
                    <div className="px-5 pt-1 pb-2">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">Notification</p>
                        <IoArrowUndoSharp className="text-[#ff6767] text-3xl" />
                      </div>
                      <p className="text-[#747474]">Today</p>
                    </div>
                    <ul className="bg-[#d3d3d3] px-5">
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                      <li>List</li>
                    </ul>
                  </div>
                </Menu>
              </div>

              <div>
                {/* <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  customInput={
                    <ExampleCustomInput className="example-custom-input" />
                  }
                /> */}
              </div>

              <div className="bg-[#fc7474] hover:bg-[#FF6767] text-white w-9 h-9 flex items-center justify-center rounded-md">
                <FaRegCalendarAlt />
              </div>
            </div>
            <div className="ms-10">
              <p className="font-semibold capitalize">
                {days[new Date().getDay()]}
              </p>
              <p className="text-[#3ABEFF]">{`${new Date().getDate()}/${
                new Date().getMonth() + 1
              }/${new Date().getFullYear()}`}</p>
            </div>
          </nav>
        </div>
      </header>

      <main className="min-h-screen flex pt-[140px]">
        {/* Left Navigation Bar */}
        <section className="bg-transparent fixed h-screen top-0 min-w-[260px] w-[260px] text-white pt-[140px]">
          <div
            className="relative bg-[#FF6767] h-full rounded-tr-md 
        rounded-br-md flex flex-col pt-24"
          >
            {/* User photo */}
            <div className="absolute top-0 -translate-y-1/4 w-full">
              <Avatar
                alt="Userphoto"
                src={userphoto}
                sx={{
                  width: 70,
                  height: 70,
                  border: "1px solid white",
                  marginBottom: "10px",
                  marginX: "auto",
                }}
              />
              <p className="font-semibold text-center capitalize">{username}</p>
              <p className="text-sm text-center">{useremail}</p>
            </div>

            {/* Left Navbar */}
            <ul
              className="w-full flex flex-col gap-2 overflow-y-scroll justify-between px-5 
            myScrollBar"
            >
              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <NavLink
                  to="/dashboard"
                  className="px-2.5 py-3 flex gap-3 items-center"
                >
                  <MdDashboard className="text-2xl" />
                  <span className="text-[14px]">Dashboard</span>
                </NavLink>
              </li>
              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <NavLink
                  to="/vitaltaks"
                  className="px-2.5 py-3 flex gap-3 items-center"
                >
                  {/* <FaExclamation className="text-2xl" /> */}
                  <BsExclamationLg className="text-2xl" />
                  <span className="text-[14px]">VitalTask</span>
                </NavLink>
              </li>
              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <NavLink
                  to="/mytasks"
                  className="px-2.5 py-3 flex gap-3 items-center"
                >
                  <BiTask className="text-2xl" />
                  <span className="text-[14px]">My Task</span>
                </NavLink>
              </li>
              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <NavLink
                  to="/tscategories"
                  className="px-2.5 py-3 flex gap-3 items-center"
                >
                  <HiMiniListBullet className="text-2xl" />
                  <span className="text-[14px]">Task Categories</span>
                </NavLink>
              </li>
              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <NavLink
                  to="/settings"
                  className="px-2.5 py-3 flex gap-3 items-center"
                >
                  <IoMdSettings className="text-2xl" />
                  <span className="text-[14px]">Setting</span>
                </NavLink>
              </li>
              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <NavLink
                  to="/helps"
                  className="px-2.5 py-3 flex gap-3 items-center"
                >
                  <MdOutlineHelp className="text-2xl" />
                  <span className="text-[14px]">Help</span>
                </NavLink>
              </li>

              <li className="hover:bg-white hover:text-[#FF6767] rounded-xl">
                <button
                  type="button"
                  className="w-full px-2.5 py-3 flex gap-3 items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <MdLogout className="text-2xl" />
                  <span className="text-[14px]">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="w-full ps-[260px] min-h-full pb-10">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
