import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import card1 from "../assets/krishna1.jpg";
import { FaRegImage } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../Redux/loaderSlice";
import { toast } from "react-toastify";
import {
  deleteTaskById,
  finishTask,
  getTaskById,
  vitalTask,
} from "../api/user/user-api";

const TaskCard1 = ({
  isVital,
  cardData,
  isActive,
  fetchTasksMethod,
  setEditTaskFlag = null,
  editTaskModel,
  setEditTaskModel,
  setEditFormValues,
}) => {
  let dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let [taskData, settaskData] = useState([]);
  let uniqeIdForButton = `${Math.round(Math.random() * 10000)}-${new String(
    Date.now()
  ).slice(-5)}`;

  let dateFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = async (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    dispatch(setIsLoading(true));

    try {
      let data = await getTaskById(cardData.cardId);
      // console.log(data.task);
      settaskData(data.task);

      setEditTaskFlag({
        flag: true,
        id: cardData.cardId,
        imgaePreview: data.task.taskimage.secure_url,
      });

      setEditTaskModel(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let editFormVal = ["tasktitle", "taskdate", "priority", "taskdesc"];

    if (taskData && editTaskModel) {
      for (let val of editFormVal) {
        setEditFormValues(val, taskData[val]);
      }
      dispatch(setIsLoading(false));
    }
  }, [taskData, setEditFormValues]);

  const handleDelete = async (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    dispatch(setIsLoading(true));
    try {
      let data = await deleteTaskById(cardData.cardId);
      // console.log(data);
      await fetchTasksMethod();
    } catch (error) {
      console.log(error);
    }
  };

  const handleVital = async (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    let res;

    try {
      res = await vitalTask(cardData.cardId, {
        isVitalTask: isVital ? true : false,
      });
      // console.log(res);
      if (res.success) {
        await fetchTasksMethod();
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    let res;
    let date = new Date();
    let completedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

    try {
      res = await finishTask(cardData.cardId, {
        completedOn: completedDate,
        status: "completed",
      });
      // console.log(res);
      if (res.success) {
        await fetchTasksMethod();
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getCardRingTheme = (status) => {
    if (status == "completed") return "border-[#05a301]";
    else if (status == "in progress") return "border-[#0225ff]";
    else return "border-[#f21e1e]";
  };

  let getCardStatusTheme = (status) => {
    if (status == "completed") return "text-[#05a301]";
    else if (status == "in progress") return "text-[#0225ff]";
    else return "text-[#f21e1e]";
  };

  return (
    // <div className="relative border border-[#A1A3AB] rounded-xl min-h-24 p-3.5">
    <div
      className={`relative ${
        isActive ? "border-[2px] border-[#FF6767]" : "border border-[#A1A3AB]"
      } rounded-xl min-h-24 p-3.5`}
    >
      {/* <==================Task Card===================> */}

      {/* Three Dot Menu */}
      <div>
        <button
          id={`basic-button-${uniqeIdForButton}`}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="absolute top-1 right-1 cursor-pointer outline-none z-30 px-2"
          onClick={handleClick}
        >
          <PiDotsThreeOutlineLight className="text-2xl text-[#8f9097]" />
        </button>

        <Menu
          id={`basic-menu`}
          anchorEl={anchorEl}
          open={open}
          disableScrollLock
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": `${uniqeIdForButton}`,
            },
          }}
        >
          <MenuItem onClick={handleVital}>
            {isVital ? "Vital" : "Remove vital"}
          </MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleFinish}>Finish</MenuItem>
        </Menu>
      </div>

      {/* Content */}
      <div className="ms-4 xl:ms-5 me-2 xl:me-3">
        <div className="relative flex items-center">
          {/* Status Ring */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-[150%] left-0 w-3 h-3 xl:w-4 xl:h-4 rounded-full 
                    border-[2px] ${getCardRingTheme(cardData.cardStatus)}`}
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
            {cardData.cardImage != "no image" ? (
              <img
                src={cardData.cardImage}
                alt="Card Image"
                className="w-[60px] h-[60px] xl:w-[70px] xl:h-[70px] rounded-2xl"
              />
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
              className={`${getCardStatusTheme(
                cardData.cardStatus
              )} text-nowrap`}
            >
              {cardData.cardStatus}
            </span>
          </p>
          <p className="text-[#747474]">
            Created on:{" "}
            {new Intl.DateTimeFormat("en-GB", dateFormatOptions).format(
              new Date(cardData.createdOn)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard1;
