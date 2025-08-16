import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import matsya from "../assets/Matsya.JPG";
import kurma from "../assets/Kurma.JPG";
import varah from "../assets/Varah.JPG";
import vaman from "../assets/Vaman.JPG";
import { HiUserAdd } from "react-icons/hi";
import {
  BsClipboardCheck,
  BsClipboardData,
  BsClipboardPlus,
  BsDot,
} from "react-icons/bs";
import card1 from "../assets/krishna1.jpg";
import TaskCard1 from "../Components/TaskCard1";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import TaskCard2 from "../Components/TaskCard2";
import { GoDotFill } from "react-icons/go";
import { LuImageUp } from "react-icons/lu";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { setAuth, setUser } from "../Redux/userSlice";
import { setIsLoading } from "../Redux/loaderSlice";
import _ from "lodash";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { updateToken } from "../Redux/tokenSclice";
import { addTask, getTaskList, updateTask } from "../api/user/user-api";
import {
  filterCompltedTask,
  filterInProgressTask,
  filterNotCompletedTask,
  filterNotStartedTask,
} from "../Components/filters";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  let dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  let userData = useSelector((state) => state.user.data);
  let token =
    useSelector((state) => state.tokenBucket.token) ??
    sessionStorage.getItem("todoToken");
  let [inviteModel, setInviteModel] = useState(false);
  let [addTaskModel, setAddTaskModel] = useState(false);
  let [editTask, setEditTask] = useState({
    flag: false,
    id: null,
    imgaePreview: null,
  });
  const toastShown = useRef(false);
  let [completedTask, setCompletedTask] = useState([]);
  let [notCompletedTask, setNotCompletedTask] = useState([]);
  let [report, setReport] = useState({
    completed: 0,
    inProgrss: 0,
    notStarted: 0,
  });
  let [newUpload, setNewUpload] = useState(false);
  let [removeImageDialog, setRemoveImageDialog] = useState(false);
  let closeRemoveImageDialog = () => {
    setRemoveImageDialog(false);
  };

  let agreeImageDiaglog = () => {
    setRemoveImageDialog(false);
    setNewUpload(true);
  };

  // Successful Login toast after first login
  useEffect(() => {
    if (
      location.state &&
      location.state.isLoggedinRightNow &&
      !toastShown.current
    ) {
      toast.success(location.state.message);
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  let dashavatar = [matsya, kurma, varah, vaman];

  // Invote Model close function
  let handleClose = () => {
    setInviteModel(false);
  };

  // Get task method to fetch
  let fetchTasks = async () => {
    try {
      let data = await getTaskList();
      // console.log(data.user);
      if (!_.isEqual(data.user, userData)) {
        dispatch(setUser(data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();

    //Filter all completed tasks
    completedTask = filterCompltedTask(userData.tasks);
    setCompletedTask([...completedTask]);

    //Filter all not completed tasks
    notCompletedTask = filterNotCompletedTask(userData.tasks);
    setNotCompletedTask([...notCompletedTask]);

    //Filter all in progress tasks
    let inProgressTask = filterInProgressTask(userData.tasks);

    //Filter all not started tasks
    let notStarted = filterNotStartedTask(userData.tasks);

    setReport({
      completed:
        Math.round((completedTask.length / userData.tasks.length) * 10000) /
        100,
      inProgrss:
        Math.round((inProgressTask.length / userData.tasks.length) * 10000) /
        100,
      notStarted:
        Math.round((notStarted.length / userData.tasks.length) * 10000) / 100,
    });
  }, [userData]);

  let randomNum = Math.round(Math.random() * 10000);
  let randomTaskData = {
    priority: "extreme",
    taskdate: "2025-08-13T21:24",
    taskdesc: `Sitaram-${randomNum}`,
    tasktitle: `Ram-${randomNum}`,
  };

  // React hook for for add task form
  let {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: randomTaskData,
  });

  {
    /* <===============  Add Task Dialog Form handleSubmit  ==============>*/
  }
  let onAddTask = async (data) => {
    let res;

    let formData = new FormData();
    for (let fl in data) {
      if (fl == "taskimage") {
        formData.append(fl, data[fl][0]);
      } else {
        formData.append(fl, data[fl]);
      }
    }

    try {
      if (editTask.flag) {
        formData.append("newUpload", newUpload);
        res = await updateTask(editTask.id, formData);
        // console.log("EditResponse:", res);
      } else {
        res = await addTask(formData);
        // console.log("AddTaskResponse:", res);
      }
      if (res.success && res.upload) {
        reset();
        setAddTaskModel(false);
        await fetchTasks();
        toast.success(res.uploadMessage);
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setNewUpload(false);
    }
  };

  useEffect(() => console.log(newUpload), [newUpload]);

  return (
    <div className="px-10 xl:px-18">
      {/* <===============  Head Lines of Dashboard  ==============>*/}
      <div className="flex items-center justify-between mb-8">
        <p className=" lg:text-[26px] xl:text-4xl font-semibold capitalize">
          Welcome Back, {userData.username} &#128591;
        </p>
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-1">
            {dashavatar.map((i, inx) => {
              return (
                <li key={`dashavatart-img-${inx}`}>
                  <Avatar
                    src={i}
                    sx={{ borderRadius: "8px" }}
                    variant="square"
                  ></Avatar>
                </li>
              );
            })}
            <li>
              <button type="button" className="cursor-pointer">
                <Avatar
                  sx={{ borderRadius: "8px", backgroundColor: "#757575" }}
                  variant="square"
                >
                  +4
                </Avatar>
              </button>
            </li>
          </ul>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#FF6767",
              color: "#FF6767",
              textTransform: "capitalize",
              fontSize: "18px",
              padding: "4px 10px",
            }}
            onClick={() => setInviteModel(true)}
          >
            <HiUserAdd className="me-1" />
            <span>Invite</span>
          </Button>
        </div>
      </div>
      {/* <===============  Head Lines of Dashboard Ends here  ==============>*/}

      {/* <===============  Main Dashboard  ==============>*/}
      <div className="max-h-screen border-2 border-[#E3E5EC] p-6 xl:p-7 flex gap-4">
        {/* TodoTask - in Progress/Not Started */}
        <div className="w-1/2 py-5 xl:p-7 flex flex-col gap-3 rounded-xl shadow-lg">
          {/* TodoTask - in Progress/Not Started heading */}
          <div>
            <div className="px-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BsClipboardPlus className="text-xl text-[#A6A8B0]" />
                <span className="text-[#FF6767] font-semibold">To-Do</span>
              </div>
              <div>
                <button
                  type="button"
                  className="py-0.5 px-2 flex items-center gap-1 border border-transparent hover:border-[#FF6767] rounded-md"
                  onClick={() => setAddTaskModel(true)}
                >
                  <span className="text-xl text-[#FF6767] font-semibold">
                    +
                  </span>
                  <span className="text-[#A6A8B0]">Add Task</span>
                </button>
              </div>
            </div>

            <div className="px-5 flex gap-2">
              <p>20 June</p> {/*Today's Date*/}
              <p className="flex items-center text-[#A6A8B0]">
                <BsDot className="text-lg text-[#A6A8B0]" />
                <span>Today</span>
              </p>
            </div>
          </div>

          {/* <================ ToDo Cards : Not Started / Inprogress ================> */}
          {notCompletedTask.length > 0 ? (
            <ul className="px-4 myScrollBar flex flex-1 overflow-y-auto flex-col gap-y-3">
              {notCompletedTask.map((tsk, inx) => {
                return (
                  <li key={`todoCard-${inx}`}>
                    <TaskCard1
                      cardData={{
                        cardId: tsk._id,
                        cardStatus: tsk.status,
                        cardTitle: tsk.tasktitle,
                        cardDesc: tsk.taskdesc,
                        cardPriority: tsk.priority,
                        createdOn: tsk.createdAt,
                        cardImage: tsk.taskimage?.secure_url,
                      }}
                      isVital={true}
                      fetchTasksMethod={fetchTasks}
                      setEditTaskFlag={setEditTask}
                      editTaskModel={addTaskModel}
                      setEditTaskModel={setAddTaskModel}
                      setEditFormValues={setValue}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex flex-1 flex-col justify-center gap-y-3 px-2">
              <li>
                <p className="font-semibold text-xl text-center">
                  No Task found
                </p>
              </li>
            </ul>
          )}
        </div>
        {/* <================ ToDo Cards Ends : Not Started / Inprogress here ================> */}

        {/* <================ ToDo Cards starts : Completed ================> */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Tasks Report */}
          <div className="w-full flex flex-col p-5 xl:p-7 rounded-xl shadow-lg">
            <div className="min-h-8 flex items-center gap-2 mb-7">
              <BsClipboardData className="text-xl text-[#A6A8B0]" />
              {/* <BsClipboardCheck /> */}
              <span className="text-[#FF6767] font-semibold">Task Status</span>
            </div>

            <div className="flex justify-between gap-2">
              {/* Completed Radial Progess Bar */}
              <div className="inline-flex flex-col items-center">
                <div className="relative mb-3">
                  <CircularProgressbar
                    value={report.completed}
                    maxValue={100}
                    counterClockwise={true}
                    strokeWidth={11}
                    className="w-[80px] h-[80px] xl:w-[90px] xl:h-[90px]"
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",
                      // Colors
                      pathColor: `#05a301`,
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
                    {`${report.completed}%`}
                  </p>
                </div>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 me-2 rounded-full bg-green-500"></span>
                  <span className="text-xs xl:text-sm font-semibold">
                    Completed
                  </span>
                </p>
              </div>

              {/* In Progess Radial Progess Bar */}
              <div className="inline-flex flex-col">
                <div className="relative mb-3">
                  <CircularProgressbar
                    value={report.inProgrss}
                    maxValue={100}
                    counterClockwise={true}
                    strokeWidth={11}
                    className="w-[80px] h-[80px] xl:w-[90px] xl:h-[90px]"
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",
                      // Colors
                      pathColor: `#0225ff`,
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
                    {`${report.inProgrss}%`}
                  </p>
                </div>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 me-2 rounded-full bg-[#0225ff]"></span>
                  <span className="text-xs xl:text-sm font-semibold">
                    In Progress
                  </span>
                </p>
              </div>

              {/* Not Started Radial Progess Bar */}
              <div className="inline-flex flex-col">
                <div className="relative mb-3">
                  <CircularProgressbar
                    value={report.notStarted}
                    maxValue={100}
                    counterClockwise={false}
                    strokeWidth={11}
                    className="w-[80px] h-[80px] xl:w-[90px] xl:h-[90px]"
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",
                      // Colors
                      pathColor: `#f21e1e`,
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
                    {`${report.notStarted}%`}
                  </p>
                </div>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 me-2 rounded-full bg-[#f21e1e]"></span>
                  <span className="text-xs xl:text-sm font-semibold">
                    Not Started
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="w-full flex flex-1 overflow-y-hidden flex-col py-5 xl:p-7 rounded-xl shadow-lg">
            <div className="min-h-8 flex items-center gap-2 mb-7 px-5">
              <BsClipboardCheck className="text-xl text-[#A6A8B0]" />
              <span className="text-[#FF6767] font-semibold">
                Completed Task
              </span>
            </div>

            {/* <================ ToDo Cards : Completed ================> */}
            <ul className="px-4  myScrollBar flex flex-1 overflow-y-auto flex-col gap-y-3">
              {completedTask.length > 0 ? (
                <>
                  {completedTask.map((tsk, inx) => {
                    return (
                      <li key={`todoCard2-${inx}`}>
                        <TaskCard2
                          cardData={{
                            cardId: tsk._id,
                            cardStatus: tsk.status,
                            cardTitle: tsk.tasktitle,
                            cardDesc: tsk.taskdesc,
                            cardPriority: tsk.priority,
                            createdOn: tsk.createdAt,
                            cardImage: tsk.taskimage,
                            completedOn: tsk.completedOn,
                          }}
                        />
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  <li>
                    <p className="font-semibold text-xl text-center">
                      No Task completed so far.
                    </p>
                  </li>
                </>
              )}
            </ul>
            {/* <================ ToDo Cards ================> */}
          </div>
        </div>
      </div>

      {/* <===============  Send Invite Dialog  ==============>*/}
      <Dialog
        onClose={handleClose}
        open={inviteModel}
        fullWidth={true}
        maxWidth={"sm"}
        disableScrollLock
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold flex flex-col">
              <span>Send a invite to a new member</span>
              <span className="w-20 border-1 border-[#f24e1e]"></span>
            </p>
            <button
              type="button"
              className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
              onClick={handleClose}
            >
              Go Back
            </button>
          </div>
          <div className="border-2 border-[#D3D3D3] p-3">
            <form action="#">
              <label htmlFor="inviteEmail" className="font-semibold text-sm">
                Email
              </label>
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  type="text"
                  id="inviteEmail"
                  className="flex-1 border border-[#b9b9b9] py-1.5 px-3 rounded-md outline-none text-sm"
                  placeholder="Enter Email here..."
                />

                <button
                  type="submit"
                  className="py-1.5 px-5 text-sm text-white min-h-full bg-[#f24e1e] hover:bg-[#f24f1eea]
                   rounded-md"
                >
                  Send Invite
                </button>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-semibold mb-1.5">Members</p>
              <ul className="flex flex-col gap-2.5">
                {dashavatar.map((intUsr, inx) => {
                  return (
                    <li
                      key={`inviteUser-${inx}`}
                      className="flex justify-between"
                    >
                      <div className="flex gap-2">
                        <img
                          src={intUsr}
                          alt="User Photo"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">Username</p>
                          <p className="text-sm">user email id</p>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        <select className="outline-none min-h-full cursor-pointer">
                          <option value="" className="">
                            Only View
                          </option>
                          <option value="">Can Edit</option>
                          <option value="">No Access</option>
                        </select>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Dialog>

      {/* <===============  Add Task Dialog  ==============>*/}
      <Dialog
        open={addTaskModel}
        fullWidth={true}
        maxWidth={"md"}
        disableScrollLock
      >
        <div className="p-14">
          <div className="flex justify-between items-center mb-7">
            <p className="font-semibold flex flex-col text-xl">
              <span>{editTask.flag ? "Edit Task" : "Add Task"}</span>
              <span className="w-12 border-1 border-[#f24e1e]"></span>
            </p>
            <button
              type="button"
              className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
              onClick={() => {
                reset();
                if (editTask.flag) setEditTask({ ...editTask, flag: false });
                setAddTaskModel(false);
                setNewUpload(false);
              }}
            >
              Go Back
            </button>
          </div>

          <form
            className="border border-[#b9b9b9] p-5 mb-10"
            onSubmit={handleSubmit(onAddTask)}
            id="addTaskForm"
            encType="multipart/form-data"
          >
            <div className="w-full flex items-center gap-10">
              <div className="w-[500px]">
                {/* Title */}
                <div className="flex flex-col mb-2">
                  <label htmlFor="curpwd" className="font-semibold mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="tasktitle"
                    className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
                    {...register("tasktitle", {
                      required: {
                        value: true,
                        message: "task title is required.",
                      },
                    })}
                  />
                  {errors.tasktitle && (
                    <small className="text-red-500">
                      {errors.tasktitle.message}
                    </small>
                  )}
                </div>

                {/* Date */}
                <div className="flex flex-col mb-2">
                  <label htmlFor="curpwd" className="font-semibold mb-1">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    id="taskdate"
                    className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm cursor-pointer"
                    {...register("taskdate", {
                      required: {
                        value: true,
                        message: "task date is required.",
                      },
                    })}
                  />

                  {errors.taskdate && (
                    <small className="text-red-500">
                      {errors.taskdate.message}
                    </small>
                  )}
                </div>

                {/* Priority */}
                <div className="mb-2">
                  <p className="font-semibold mb-1">Priority</p>
                  <ul className="list-none flex items-center gap-3">
                    <li>
                      <label
                        htmlFor="taskExtreme"
                        className="flex gap-3 items-center"
                      >
                        <p className="flex items-center gap-1">
                          <GoDotFill className="text-sm text-[#f21e1e]" />
                          <span>Extreme</span>
                        </p>
                        <input
                          type="radio"
                          value="extreme"
                          {...register("priority", {
                            required: {
                              value: true,
                              message:
                                "al least one priority date is required.",
                            },
                          })}
                        />
                      </label>
                    </li>

                    <li>
                      <label
                        htmlFor="taskExtreme"
                        className="flex gap-3 items-center"
                      >
                        <p className="flex items-center gap-1">
                          <GoDotFill className="text-sm text-[#3abeff]" />
                          <span>Moderate</span>
                        </p>
                        <input
                          type="radio"
                          value="moderate"
                          {...register("priority", {
                            required: {
                              value: true,
                              message:
                                "al least one priority date is required.",
                            },
                          })}
                        />
                      </label>
                    </li>

                    <li>
                      <label
                        htmlFor="taskExtreme"
                        className="flex gap-3 items-center"
                      >
                        <p className="flex items-center gap-1">
                          <GoDotFill className="text-sm text-[#05a301]" />
                          <span>Low</span>
                        </p>
                        <input
                          type="radio"
                          value="low"
                          {...register("priority", {
                            required: {
                              value: true,
                              message:
                                "al least one priority date is required.",
                            },
                          })}
                        />
                      </label>
                    </li>
                  </ul>
                  {errors.priority ? (
                    <small className="text-red-500">
                      {errors.priority.message}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="relative flex justify-center-safe flex-1 h-full py-2">
                <img
                  src={editTask.imgaePreview}
                  alt="Taskimage Preview"
                  className="w-full h-[200px] rounded-md"
                />
              </div>
            </div>

            {/* Description and Image */}
            <div className="flex justify-between gap-10 mb-7">
              {/* Task descripttion */}
              <div className="flex flex-col">
                <label htmlFor="curpwd" className="font-semibold mb-1">
                  Task Description
                </label>
                <textarea
                  className="py-1.5 px-3 outline-none w-[500px] min-h-[200px] border border-[#A1A3AB] rounded-sm"
                  placeholder="Start writing here..."
                  {...register("taskdesc", {
                    required: {
                      value: true,
                      message: "Task Description is required.",
                    },
                  })}
                ></textarea>
                {errors.taskdesc ? (
                  <small className="text-red-500">
                    {errors.taskdesc.message}
                  </small>
                ) : (
                  <small className="opacity-0">Test</small>
                )}
              </div>

              {/* Drag and drop component */}
              <div className="w-full flex flex-col gap-0 flex-1">
                <Controller
                  name="taskimage"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Task Image is required.",
                    },
                    validate: {
                      sizeLessthan5MB: (file) => {
                        if (file[0].size > 5000000) {
                          return "image size must be less than 5 MB";
                        }
                        return true;
                      },
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => {
                    const onDrop = useCallback(
                      (acceptedFiles) => {
                        setNewUpload(true);
                        setEditTask({
                          ...editTask,
                          imgaePreview: URL.createObjectURL(acceptedFiles[0]),
                        });
                        // Update React Hook Form's state with the accepted files
                        onChange(acceptedFiles);
                      },
                      [onChange]
                    );

                    const { getRootProps, getInputProps, isDragActive } =
                      useDropzone({
                        onDrop,
                      });

                    return (
                      <div className="flex flex-col w-full h-full">
                        <label htmlFor="curpwd" className="font-semibold mb-1">
                          {editTask.flag ? "Replace Image" : "Upload Image"}
                        </label>

                        <div {...getRootProps()} className="h-full">
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <div className="border border-[#A1A3AB] text-[#A1A3AB] rounded-sm h-full p-4 flex flex-col justify-center items-center">
                              <LuImageUp className="w-16 h-16 mx-auto" />
                              <small>Drop the files here</small>
                            </div>
                          ) : (
                            <div className="border border-[#A1A3AB] text-[#A1A3AB] rounded-sm h-full p-4 flex flex-col justify-between">
                              <LuImageUp className="w-16 h-16 mx-auto" />
                              <small className="text-sm text-center">
                                Drag & Drop files here
                              </small>
                              {/* <p className="text-sm text-center">or</p> */}
                              <div className="relative flex flex-col justify-center">
                                <div className="flex justify-center">
                                  <button
                                    type="button"
                                    className="py-1 px-3 mb-1 border border-[#A1A3AB] text-sm text-[#A1A3AB] bg-transparent flex items-center gap-1 rounded-lg cursor-pointer hover:bg-[#A1A3AB] hover:text-white"
                                  >
                                    Browse
                                  </button>
                                </div>

                                {/* Display file name */}
                                {value && value.length > 0 ? (
                                  <div className="flex items-center gap-1 text-blue-600">
                                    <small>File:</small>
                                    <small>{`${value[0].name.substring(
                                      0,
                                      18
                                    )}...`}</small>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }}
                />

                {errors.taskimage ? (
                  <small className="text-red-500">
                    {errors.taskimage.message}
                  </small>
                ) : (
                  <small className="opacity-0">Test</small>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="py-1.5 px-10 bg-[#f24e1e] text-white flex items-center gap-1 rounded-sm 
                cursor-pointer"
              >
                {editTask.flag ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;
