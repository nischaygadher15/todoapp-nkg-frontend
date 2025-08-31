import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { Dialog } from "@mui/material";
import TaskCard1 from "../Components/TaskCard1";
import { GoDotFill } from "react-icons/go";
import { LuImageUp } from "react-icons/lu";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addTask,
  deleteTaskById,
  getTaskById,
  getTaskList,
  updateTask,
} from "../api/user/user-api";
import { setUser } from "../Redux/userSlice";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegImage } from "react-icons/fa6";
import { setIsLoading } from "../Redux/loaderSlice";
import { filterNotCompletedTask, filterVitalTask } from "../Components/filters";

const Vitaltasks = () => {
  let dispatch = useDispatch();
  let userData = useSelector((state) => state.user.data);
  let [editTaskModel, setEditTaskModel] = useState(false);
  let [vitalTask, setVitalTask] = useState([]);
  let [editTask, setEditTask] = useState({
    flag: false,
    id: null,
    imgaePreview: null,
  });
  let [activeCard, setActiveCard] = useState({
    index: null,
    id: null,
  });
  let [newUpload, setNewUpload] = useState(false);
  let [fetchFlag, setFatchFlag] = useState(true);
  let [taskData, setTaskData] = useState({
    category: "",
    completedOn: "",
    createdAt: "",
    isVitalTask: "",
    priority: "",
    status: "",
    taskdate: "",
    taskdesc: "",
    taskimage: "",
    tasktitle: "",
  });

  // Get task method to fetch
  let fetchTasks = async () => {
    try {
      let data = await getTaskList();
      //Filter all not completed tasks
      vitalTask = filterVitalTask(data.user.tasks);
      setVitalTask([...vitalTask]);
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetchFlag) {
      fetchTasks();
      setFatchFlag(false);
    }
  }, [userData]);

  useEffect(() => {
    if (vitalTask.length > 0) {
      setActiveCard({
        index: 0,
        id: vitalTask[0]._id,
      });
    }
  }, [vitalTask]);

  // React hook for for add task form
  let {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  {
    /* <===============  Edit Task Dialog Form handleSubmit  ==============>*/
  }
  let onAddTask = async (data) => {
    console.log(data);
    let res;

    let formData = new FormData();
    for (let fl in data) {
      if (data[fl] && fl == "taskimage") {
        formData.append(fl, data[fl][0]);
      } else {
        formData.append(fl, data[fl]);
      }
    }

    try {
      if (editTask.flag) {
        formData.append("newUpload", newUpload);
        res = await updateTask(editTask.id, formData);
        console.log("EditResponse:", res);
      } else {
        formData.append("isVitalTask", true);
        res = await addTask(formData);
        // console.log("AddTaskResponse:", res);
      }
      if (res.success && res.upload) {
        reset();
        setEditTaskModel(false);
        setFatchFlag(true);
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

  let getTaskData = async (taskId) => {
    let data = await getTaskById(taskId);
    // console.log(data.task);
    setTaskData(data.task);
  };

  const handleDelete = async () => {
    dispatch(setIsLoading(true));
    try {
      let data = await deleteTaskById(activeCard.id);
      // console.log(data);
      setFatchFlag(true);
      await fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task");
    }
  };

  let formateDate = (date) => {
    if (date) {
      let myDate = new Date(date);
      let dateFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      let completedDate = new Intl.DateTimeFormat(
        "en-GB",
        dateFormatOptions
      ).format(myDate);

      // console.log(completedDate); // 15/08/2025, 11:27 am
      return completedDate;
    } else return "";
  };

  const handleEdit = async () => {
    setEditTask({
      id: activeCard.id,
      imgaePreview: taskData.taskimage.secure_url,
    });
    setEditTaskModel(true);
  };

  useEffect(() => {
    let editFormVal = ["tasktitle", "taskdate", "priority", "taskdesc"];

    if (editTask.id == taskData.id) {
      if (editTaskModel && editTask.flag) {
        for (let val of editFormVal) {
          setValue(val, taskData[val]);
        }
      }
    }
  }, [editTaskModel, setValue]);

  useEffect(() => {
    if (activeCard.id) getTaskData(activeCard.id);
  }, [activeCard]);

  let getCardStatusTheme = (status) => {
    if (status == "completed") return "text-[#05a301]";
    else if (status == "in progress") return "text-[#0225ff]";
    else return "text-[#f21e1e]";
  };

  let getPriorityTheme = (status) => {
    if (status == "low") return "text-[#05a301]";
    else if (status == "moderate") return "text-[#0225ff]";
    else return "text-[#f21e1e]";
  };

  return (
    <div className="h-screen px-10 xl:px-18">
      <div className="h-full flex gap-4 pb-10">
        {/* TodoTask - in Progress/Not Started */}
        <div className="w-[45%] flex flex-col max-h-screen py-5 rounded-xl shadow-lg border-1 border-[#bebebe]">
          <div className="flex justify-between px-5 mb-3">
            <div className="px-5 flex flex-col mb-4">
              <span className="font-semibold">Vital Tasks</span>
              <span className="w-7 border border-[#FF6767]"></span>
            </div>
            <div>
              <button
                type="button"
                className="py-0.5 px-2 flex items-center gap-1 border border-transparent hover:border-[#FF6767] rounded-md"
                onClick={() => {
                  setEditTask({ ...editTask, flag: false });
                  setEditTaskModel(true);
                }}
              >
                <span className="text-xl text-[#FF6767] font-semibold">+</span>
                <span className="text-[#A6A8B0]">Add Task</span>
              </button>
            </div>
          </div>

          {/* <================ ToDo Cards : Not Started / Inprogress ================> */}

          {vitalTask.length > 0 ? (
            <ul className="h-full px-4 myScrollBar overflow-y-auto flex flex-1 flex-col gap-y-3">
              {vitalTask.map((tsk, inx) => {
                return (
                  <li
                    key={`todoCard-${inx}`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      setActiveCard({ index: inx, id: tsk._id });
                    }}
                  >
                    <TaskCard1
                      cardData={{
                        cardId: tsk._id,
                        cardStatus: tsk.status,
                        cardTitle: tsk.tasktitle,
                        cardDesc: tsk.taskdesc,
                        cardPriority: tsk.priority,
                        createdOn: tsk.createdAt,
                        cardImage: tsk.taskimage.secure_url,
                      }}
                      isVital={false}
                      isActive={activeCard.index == inx}
                      setEditTaskFlag={setEditTask}
                      fetchTasksMethod={fetchTasks}
                      editTaskModel={editTaskModel}
                      setEditTaskModel={setEditTaskModel}
                      setEditFormValues={setValue}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="h-full flex flex-col justify-center gap-y-3">
              <li>
                <p className="font-semibold text-xl text-center">
                  No Task found
                </p>
              </li>
            </ul>
          )}

          {/* <================ ToDo Cards ================> */}
        </div>

        {/* TodoTask - View */}
        <div className="w-[55%]">
          {vitalTask.length > 0 ? (
            <div className="min-h-full max-h-screen flex flex-col justify-between p-5 rounded-xl shadow-lg border-1 border-[#bebebe]">
              {/* Task Header */}
              <div className="w-full max-h-80 flex gap-3 mb-4">
                <div className="w-2/5">
                  {taskData.taskimage.secure_url ? (
                    <>
                      <img
                        src={taskData.taskimage.secure_url}
                        alt="Task Image"
                        className="w-full h-full rounded-xl"
                      />
                    </>
                  ) : (
                    <div>
                      <FaRegImage className="w-full h-full rounded-2xl text-[#A1A3AB]" />
                    </div>
                  )}
                </div>
                <div className="w-3/5 flex flex-col justify-center gap-2">
                  <p className="text-base capitalize font-semibold">
                    {taskData.tasktitle}
                  </p>
                  <p className="text-xs">
                    Priority:{" "}
                    <span
                      className={`${getPriorityTheme(
                        taskData.priority
                      )} capitalize`}
                    >
                      {taskData.priority}
                    </span>
                  </p>
                  <p className="text-xs capitalize">
                    Status:{" "}
                    <span className={`${getCardStatusTheme(taskData.status)}`}>
                      {taskData.status}
                    </span>
                  </p>
                  <p className="text-[11px] text-[#747474]">
                    Created on: {formateDate(taskData.createdAt)}
                  </p>
                  {taskData.completedOn && (
                    <p className="text-[11px] text-[#05a301]">
                      Completed on: {formateDate(taskData.completedOn)}
                    </p>
                  )}
                </div>
              </div>

              {/* Task Details */}
              <div className="text-[#747474] max-h-full myScrollBar overflow-y-auto pe-2 flex flex-1 flex-col gap-1 mb-10">
                <p className="flex items-center gap-1">
                  <span className="font-semibold text-[#616060]">
                    Task Title:{" "}
                  </span>
                  <span className="text-sm capitalize">
                    {taskData.tasktitle}
                  </span>
                </p>

                <p>
                  <span className="font-semibold text-[#616060]">
                    Task Description:{" "}
                  </span>
                  <span className="text-sm">{taskData.taskdesc}</span>
                </p>
              </div>

              {/* Task Tab Footer */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="w-9 h-9 bg-[#fc7474] hover:bg-[#FF6767] rounded-lg flex justify-center items-center cursor-pointer"
                  onClick={handleDelete}
                >
                  <MdDelete className="text-white text-xl" />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 bg-[#fc7474] hover:bg-[#FF6767] rounded-lg flex justify-center items-center cursor-pointer"
                  onClick={handleEdit}
                >
                  <RiEdit2Fill className="text-white text-xl" />
                </button>
              </div>
            </div>
          ) : (
            <div className="min-h-full flex justify-center items-center p-5 rounded-xl shadow-lg border-1 border-[#bebebe]">
              <p className="font-semibold text-xl text-center">
                No Task to view
              </p>
            </div>
          )}
        </div>

        {/* <===============  Add Task Dialog  ==============>*/}
        <Dialog
          open={editTaskModel}
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
                  setEditTaskModel(false);
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
              <div className="w-full flex items-center gap-10 mb-3">
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

                <div className="relative w-full h-[200px] flex justify-center flex-1 py-2">
                  {editTask.imgaePreview && (
                    <img
                      src={editTask.imgaePreview}
                      alt="Taskimage Preview"
                      className="w-full h-full rounded-md"
                    />
                  )}
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
                        value: taskData.taskimage.secure_url ? false : true,
                        message: "Task Image is required.",
                      },
                      validate: {
                        sizeLessthan5MB: (file) => {
                          if (!taskData.taskimage.secure_url) {
                            if (file[0].size > 5000000) {
                              return "image size must be less than 5 MB";
                            }
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
                          <label
                            htmlFor="curpwd"
                            className="font-semibold mb-1"
                          >
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
    </div>
  );
};

export default Vitaltasks;
