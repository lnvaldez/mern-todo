import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import TaskDetail from "../components/TaskDetail";
import TaskInput from "../components/TaskInput";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_TASKS", payload: json });
    }
  };

  if (user) {
    useEffect(() => {
      fetchTasks();
    }, [dispatch, user]);
  }

  return (
    <div className="home">
      <TaskInput />
      <div
        className="tasks"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {tasks &&
          tasks.map((task) => <TaskDetail key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default Home;
