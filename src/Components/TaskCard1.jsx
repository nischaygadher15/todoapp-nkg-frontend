import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import card1 from "../assets/krishna1.jpg";
import { FaRegImage } from "react-icons/fa6";

const TaskCard1 = ({ cardData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative border border-[#A1A3AB] rounded-xl min-h-24 p-3.5">
      {/* <==================Task Card===================> */}

      {/* Three Dot Menu */}
      <div>
        <button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="absolute top-1 right-1 cursor-pointer outline-none z-10 px-2"
          onClick={handleClick}
        >
          <PiDotsThreeOutlineLight className="text-2xl text-[#8f9097]" />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          disableScrollLock
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      {/* Content */}
      <div className="ms-4 xl:ms-5 me-2 xl:me-3">
        <div className="relative flex items-center">
          {/* Status Ring */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-[150%] left-0 w-3 h-3 xl:w-4 xl:h-4 rounded-full 
                    border-[2px] ${
                      cardData.cardStatus == "Not Started"
                        ? "border-[#f21e1e]"
                        : "border-[#0225ff]"
                    }`}
          ></div>
          <p className="font-semibold text-base capitalize">
            {cardData.cardTitle}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <p className="text-sm text-[#747474]">
              {`${cardData.cardDesc.substring(0, 50)}...`}
            </p>
          </div>
          <div className="">
            {cardData.cardImage ? (
              <>
                <img
                  src={cardData.cardImage}
                  alt="Card Image"
                  className="w-[60px] h-[60px] xl:w-[70px] xl:h-[70px] rounded-2xl"
                />
              </>
            ) : (
              <>
                <FaRegImage className="w-[60px] h-[60px] xl:w-[70px] xl:h-[70px] rounded-2xl text-[#A1A3AB]" />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <p>Priority: {cardData.cardPriority}</p>
          <p>
            Status:{" "}
            <span
              className={`${
                cardData.cardStatus == "Not Started"
                  ? "text-[#f21e1e]"
                  : "text-[#0225ff]"
              } text-nowrap`}
            >
              {cardData.cardStatus}
            </span>
          </p>
          <p className="text-[#747474]">Created on: {cardData.createdOn}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard1;
