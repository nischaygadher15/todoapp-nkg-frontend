import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { Dialog } from "@mui/material";
import card1 from "../assets/krishna1.jpg";
import TaskCard1 from "../Components/TaskCard1";
import { GoDotFill } from "react-icons/go";
import { LuImageUp } from "react-icons/lu";
import { useDropzone } from "react-dropzone";

const Vitaltasks = () => {
  let [addTaskModel, setAddTaskModel] = useState(false);
  let [taskFormData, setTaskFormData] = useState({
    title: "",
    data: "",
    priority: "",
    taskDesc: "",
    taskImages: [],
  });

  let dragDropFile = (files) => {
    console.log(files);
  };

  let { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(dragDropFile),
  });

  let todoCards = [
    {
      cardStatus: "Not Started",
      cardTitle: "Jay Shree Ram 1",
      cardDesc: "Sitaram Sitaram Sitaram Sitaram Sitaram",
      cardPripority: "High",
      createdOn: "08/07/2025",
      cardImage: card1,
    },
    {
      cardStatus: "In Progress",
      cardTitle: "Jay Shree Ram 2",
      cardDesc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae error sequi excepturi quisquam aut obcaecati. Repellat placeat qui temporibus adipisci quod cupiditate! Consequatur quasi obcaecati optio aperiam libero culpa numquam!Provident nobis quam pariatur numquam voluptatum, illo quae tempora sequi id voluptas quidem. Laborum temporibus dolocorporis.`,
      cardPripority: "High",
      createdOn: "08/07/2025",
      cardImage: card1,
    },
    {
      cardStatus: "Not Started",
      cardTitle: "Jay Shree Ram 3",
      cardDesc: "Sitaram Sitaram Sitaram Sitaram Sitaram",
      cardPripority: "High",
      createdOn: "08/07/2025",
      cardImage: card1,
    },
    {
      cardStatus: "In Progress",
      cardTitle: "Jay Shree Ram 3",
      cardDesc: "Sitaram Sitaram Sitaram Sitaram Sitaram",
      cardPripority: "High",
      createdOn: "08/07/2025",
      cardImage: card1,
    },
    {
      cardStatus: "Not Started",
      cardTitle: "Jay Shree Ram 3",
      cardDesc: "Sitaram Sitaram Sitaram Sitaram Sitaram",
      cardPripority: "High",
      createdOn: "08/07/2025",
      cardImage: card1,
    },
    {
      cardStatus: "Not Started",
      cardTitle: "Jay Shree Ram 3",
      cardDesc: "Sitaram Sitaram Sitaram Sitaram Sitaram",
      cardPripority: "High",
      createdOn: "08/07/2025",
      cardImage: card1,
    },
  ];

  let [taskData, setTaskData] = useState({
    taskImage: card1,
    taskName: "Dhamra",
    taskPriority: "Highest",
    taskStatus: "In Progress",
    taskCreatedOn: "08/07/2025",
    taskTitle: "Karma",
    taskObjective: "Focus on yor work not on fruit - Krishna",
    taskDesp: `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod velit fugit cum suscipit aut nostrum illo cumque dolorum voluptatibus minima dolores tempore quaerat fugiat eum eaque, doloremque officiis est neque.
    Maxime, consectetur. A doloremque porro molestias doloribus laboriosam dolor ea, modi alias facere officia numquam dignissimos atque veniam vel sequi. Cumque ullam recusandae enim facilis voluptatibus, autem asperiores. Aut, amet!
    Magni alias distinctio aperiam voluptatibus veniam quis a esse nemo facilis, atque obcaecati unde hic modi ipsum excepturi placeat. Nostrum tenetur aperiam repellat facere iure quam ea ad quibusdam doloribus.
    Ipsum, voluptatem aut dolores dicta cumque sapiente qui dolor repellat tenetur architecto omnis libero ea impedit molestias, sint mollitia blanditiis. Fugiat pariatur optio mollitia reprehenderit atque omnis reiciendis voluptate ullam.
    Magni alias distinctio aperiam voluptatibus veniam quis a esse nemo facilis, atque obcaecati unde hic modi ipsum excepturi placeat. Nostrum tenetur aperiam repellat facere iure quam ea ad quibusdam doloribus.
    Ipsum, voluptatem aut dolores dicta cumque sapiente qui dolor repellat tenetur architecto omnis libero ea impedit molestias, sint mollitia blanditiis. Fugiat pariatur optio mollitia reprehenderit atque omnis reiciendis voluptate ullam.
    `,
    taskNotes: `
    Magni alias distinctio aperiam voluptatibus veniam quis a esse nemo facilis, atque obcaecati unde hic modi ipsum excepturi placeat. Nostrum tenetur aperiam repellat facere iure quam ea ad quibusdam doloribus.
    Magni alias distinctio aperiam voluptatibus veniam quis a esse nemo facilis, atque obcaecati unde hic modi ipsum excepturi placeat. Nostrum tenetur aperiam repellat facere iure quam ea ad quibusdam doloribus.
    Ipsum, voluptatem aut dolores dicta cumque sapiente qui dolor repellat tenetur architecto omnis libero ea impedit molestias, sint mollitia blanditiis. Fugiat pariatur optio mollitia reprehenderit atque omnis reiciendis voluptate ullam.`,
    taskDeadline: "09/07/2025",
  });

  return (
    <div className="px-10 xl:px-18">
      <div className="flex gap-4">
        {/* TodoTask - in Progress/Not Started */}
        <div className="w-[45%] p-5 rounded-xl shadow-lg border-1 border-[#bebebe]">
          <div className="flex flex-col mb-4">
            <span className="font-semibold">Vital Tasks</span>
            <span className="w-7 border border-[#FF6767]"></span>
          </div>

          {/* <================ ToDo Cards : Not Started / Inprogress ================> */}
          <ul className="flex flex-col gap-y-3">
            {todoCards.map((cd, inx) => {
              return (
                <li key={`todoCard-${inx}`}>
                  <TaskCard1
                    cardData={{
                      cardStatus: cd.cardStatus,
                      cardTitle: cd.cardTitle,
                      cardDesc: cd.cardDesc,
                      cardPripority: cd.cardPripority,
                      createdOn: cd.createdOn,
                      cardImage: cd.cardImage,
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {/* <================ ToDo Cards ================> */}
        </div>

        {/* TodoTask - Completed */}
        <div className="w-[55%]">
          <div className="p-5 rounded-xl shadow-lg border-1 border-[#bebebe]">
            {/* Task Header */}
            <div className="flex gap-3 items-end mb-4">
              <div>
                <img
                  src={taskData.taskImage}
                  alt="Task Image"
                  className="w-32 h-28 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold">{taskData.taskName}</p>
                <p className="text-xs">
                  Priority:{" "}
                  <span className="text-[#f21e1e]">
                    {taskData.taskPriority}
                  </span>
                </p>
                <p className="text-xs">
                  Status:{" "}
                  <span className="text-[#f21e1e]">{taskData.taskStatus}</span>
                </p>
                <p className="text-[10px] text-[#747474]">
                  Created on: {taskData.taskCreatedOn}
                </p>
              </div>
            </div>

            {/* Task Details */}
            <div className="text-[#747474] flex flex-col gap-1 mb-10">
              <p className="flex items-center gap-1">
                <span className="font-semibold text-[#616060]">
                  Task Title:{" "}
                </span>
                <span className="text-sm">{taskData.taskTitle}</span>
              </p>

              {/* <p className="">
                <span className="font-semibold text-[#616060]">
                  Objective:{" "}
                </span>
                <span className="text-sm">{taskData.taskObjective}</span>
              </p> */}

              <p className="">
                <span className="font-semibold text-[#616060]">
                  Task Description:{" "}
                </span>
                <span className="text-sm">{taskData.taskDesp}</span>
              </p>

              {/* <p className="">
                <span className="font-semibold text-[#616060]">
                  Additional Notes:{" "}
                </span>
                <span className="text-sm">{taskData.taskNotes}</span>
              </p> */}

              {/* <p className="flex items-center gap-1">
                <span className="font-semibold text-[#616060]">
                  Deadline for Submission:
                </span>
                <span className="text-sm">{taskData.taskDeadline}</span>
              </p> */}
            </div>

            {/* Task Tab Footer */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="w-9 h-9 bg-[#fc7474] hover:bg-[#FF6767] rounded-lg flex justify-center items-center cursor-pointer"
              >
                <MdDelete className="text-white text-xl" />
              </button>
              <button
                type="button"
                className="w-9 h-9 bg-[#fc7474] hover:bg-[#FF6767] rounded-lg flex justify-center items-center cursor-pointer"
                onClick={() => setAddTaskModel(true)}
              >
                <RiEdit2Fill className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Edit Task Dialog */}
        <Dialog
          open={addTaskModel}
          fullWidth={true}
          maxWidth={"md"}
          disableScrollLock
        >
          <div className="p-14">
            <div className="flex justify-between items-center mb-7">
              <p className="font-semibold flex flex-col">
                <span>Edit Vital Task</span>
                <span className="w-20 border-1 border-[#f24e1e]"></span>
              </p>
              <button
                type="button"
                className="font-semibold text-sm underline underline-offset-2 cursor-pointer"
                onClick={() => setAddTaskModel(false)}
              >
                Go Back
              </button>
            </div>

            <form className="border border-[#b9b9b9] p-5 mb-10">
              {/* Title */}
              <div className="flex flex-col mb-2">
                <label htmlFor="curpwd" className="font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="tasktitle"
                  className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col mb-2">
                <label htmlFor="curpwd" className="font-semibold mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="taskdate"
                  className="py-1.5 px-3 outline-none max-w-[500px] border border-[#A1A3AB] rounded-sm"
                />
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
                      <input type="checkbox" id="taskExtreme" />
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="taskModerate"
                      className="flex gap-3 items-center"
                    >
                      <p className="flex items-center gap-1">
                        <GoDotFill className="text-sm text-[#3abeff]" />

                        <span>Moderate</span>
                      </p>
                      <input type="checkbox" id="taskModerate" />
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="taskLow"
                      className="flex gap-3 items-center"
                    >
                      <p className="flex items-center gap-1">
                        <GoDotFill className="text-sm text-[#05a301]" />
                        <span>Low</span>
                      </p>
                      <input type="checkbox" id="taskLow" />
                    </label>
                  </li>
                </ul>
              </div>

              {/* Description and Image */}
              <div className="flex gap-10">
                <div className="flex flex-col mb-2">
                  <label htmlFor="curpwd" className="font-semibold mb-1">
                    Task Description
                  </label>
                  <textarea
                    className="py-1.5 px-3 outline-none w-[500px] min-h-[200px] border border-[#A1A3AB] rounded-sm"
                    placeholder="Start writing here..."
                  ></textarea>
                </div>

                <div className="flex flex-col mb-2 w-full">
                  <label htmlFor="curpwd" className="font-semibold mb-1">
                    Upload Image
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
                        <p className="text-sm text-center">or</p>
                        <div className="relative flex flex-col justify-center">
                          <div className="flex justify-center">
                            <label
                              type="button"
                              htmlFor="taskImage"
                              className="py-1 px-3 border border-[#A1A3AB] text-sm text-[#A1A3AB] bg-transparent flex items-center gap-1 rounded-lg cursor-pointer"
                            >
                              Browse
                            </label>
                          </div>

                          <small className="text-center">
                            {taskFormData?.taskImages?.length != 0
                              ? taskFormData?.taskImages[0]?.name
                              : ""}
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div>
              <button
                type="submit"
                className="py-1.5 px-10 bg-[#f24e1e] text-white flex items-center gap-1 rounded-sm cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Vitaltasks;
