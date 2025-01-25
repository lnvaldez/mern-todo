import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

// Components
import TaskDetail from "../components/TaskDetail";
import TaskInput from "../components/TaskInput";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_TASKS", payload: json });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home">
      <TaskInput />
      <div className="tasks">
        {tasks &&
          tasks.map((task) => <TaskDetail key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default Home;
