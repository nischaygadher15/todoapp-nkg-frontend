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

    if (!state.user?.data?._id) {
      console.warn("No user id found in state");
      return null;
    }

    const refreshTkResp = await api.post("/refresh", {
      userId: state.user.data._id,
    });

    console.log("refreshTkResp.data", refreshTkResp.data);

    if (refreshTkResp.data.success && refreshTkResp.data.token) {
      MyStore.dispatch(updateToken(refreshTkResp.data.token));
      sessionStorage.setItem("todoToken", refreshTkResp.data.token);
      MyStore.dispatch(setAuth(true));

      return refreshTkResp.data.token;
    } else {
      // refresh token failed → force logout
      MyStore.dispatch(updateToken(null));
      MyStore.dispatch(setAuth(false));
      MyStore.dispatch(setUser(null));
      sessionStorage.removeItem("todoToken");
      sessionStorage.removeItem("todoUser");

      toast.error("Session expired. Please log in again.");
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    toast.error("Unable to refresh session. Please log in again.");
  } finally {
    MyStore.dispatch(setRefreshing(false)); // end refreshing cycle
  }

  return null;
};
