import { useEffect, useState } from "react";

// Components
import TaskDetail from "../components/TaskDetail";
import TaskInput from "../components/TaskInput";

const Home = () => {
  const [tasks, setTasks] = useState(null);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const json = await response.json();

    if (response.ok) {
      setTasks(json);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home">
      <TaskInput onUpdate={fetchTasks} />
      <div className="tasks">
        {tasks &&
          tasks.map((task) => (
            <TaskDetail key={task._id} task={task} onUpdate={fetchTasks} />
          ))}
      </div>
    </div>
  );
};

export default Home;
