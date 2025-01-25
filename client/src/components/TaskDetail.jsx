import { useTasksContext } from "../hooks/useTasksContext";

const TaskDetail = ({ task }) => {
  const { dispatch } = useTasksContext();

  const handleCheckboxChange = async () => {
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
    });

    if (response.ok) {
      dispatch({ type: "TOGGLE_TASK", payload: task });
    }
  };

  const handleClick = async () => {
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: task });
    }
  };

  return (
    <div className="task-detail">
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      ></input>
      <h2 style={{ textDecoration: task.done ? "line-through" : null }}>
        {task.title}
      </h2>
      <button>Edit</button>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default TaskDetail;
