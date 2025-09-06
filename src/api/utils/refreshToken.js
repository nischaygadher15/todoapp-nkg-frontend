import api from "./api";
import { MyStore } from "../../store";
import { setRefreshing, updateToken } from "../../Redux/tokenSclice";
import { setAuth, setUser } from "../../Redux/userSlice";
import { toast } from "react-toastify";

export const getNewAccessToken = async () => {
  const state = MyStore.getState();

  console.log("<========== getNewAccessToken called ==========>");

  try {
    MyStore.dispatch(setRefreshing(true)); // start refreshing cycle
    const userId = state?.user.data._id
      ? state?.user.data._id
      : sessionStorage.getItem("todoUserId");

    if (!userId) {
      console.warn("No user id found in state");
      return null;
    }

    const refreshTkResp = await api.post("/refresh", {
      userId,
    });

    console.log("refreshTkResp.data", refreshTkResp.data);

    if (refreshTkResp.data.success && refreshTkResp.data.token) {
      MyStore.dispatch(updateToken(refreshTkResp.data.token));
      sessionStorage.setItem("todoToken", refreshTkResp.data.token);
      MyStore.dispatch(setAuth(true));
    } else {
      // refresh token failed → force logout
      sessionStorage.removeItem("todoToken");
      sessionStorage.removeItem("todoUser");
      sessionStorage.removeItem("todoUserId");
      MyStore.dispatch(updateToken(null));
      MyStore.dispatch(setAuth(false));
      MyStore.dispatch(setUser(null));
    }
    return refreshTkResp.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    // toast.error("Unable to refresh session. Please log in again.");
    return { success: false, message: error.message };
  } finally {
    MyStore.dispatch(setRefreshing(false)); // end refreshing cycle
  }
};
