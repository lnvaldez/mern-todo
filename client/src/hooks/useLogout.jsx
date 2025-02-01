import { useAuthContext } from "./useAuthContext.jsX";
import { useTasksContext } from "./useTasksContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchTasks } = useTasksContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    dispatchTasks({ type: "SET_TASKS", payload: null });
  };

  return { logout };
};
