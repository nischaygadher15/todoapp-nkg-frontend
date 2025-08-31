import { setIsLoading } from "../../Redux/loaderSlice";
import { MyStore } from "../../store";

export const routeChangeLoader = async () => {
  MyStore.dispatch(setIsLoading(true));
  setTimeout(() => {
    MyStore.dispatch(setIsLoading(false));
    return () => clearTimeout(timer);
  }, 300);
};
