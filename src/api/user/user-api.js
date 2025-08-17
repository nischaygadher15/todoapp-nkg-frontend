import { appBarClasses } from "@mui/material/AppBar";
import api from "../utils/api";

export const loginUser = async (userdata) => {
  try {
    let res = await api.post("/login", userdata);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not log in user.", error);
    throw error;
  }
};

export const createUser = async (userdata) => {
  try {
    let res = await api.post("/register", userdata);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not create user.", error);
    throw error;
  }
};

export const verifyAuth = async () => {
  try {
    let res = await api.post("/auth", {});
    return res.data;
  } catch (error) {
    console.error("API Error: Could not verify token.", error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    let res = await api.post("/addtask", taskData);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not add task.", error);
    throw error;
  }
};

export const getTaskList = async () => {
  try {
    let res = await api.get(`/gettask`);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not get task list.", error);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    let res = await api.get(`/gettask/${taskId}`);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not get task by ID.", error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    let res = await api.put(`/edittask/${taskId}`, taskData);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not update task.", error);
    throw error;
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    let res = await api.delete(`/deletetask/${taskId}`);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not delete task.", error);
    throw error;
  }
};

export const vitalTask = async (taskId, taskData) => {
  try {
    let res = await api.put(`/markvital/${taskId}`, taskData);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not mark task as vital.", error);
    throw error;
  }
};

export const finishTask = async (taskId, taskData) => {
  try {
    let res = await api.put(`/finishtask/${taskId}`, taskData);
    return res.data;
  } catch (error) {
    console.error("API Error: Could not mark task as finish.", error);
    throw error;
  }
};

export const updateUserInfo = async (userId, data) => {
  try {
    let res = await api.put(`/accinfo/${userId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
