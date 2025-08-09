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
