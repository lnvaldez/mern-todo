import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

const TaskInput = ({ onUpdate }) => {
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setTitle("");
        setError(null);
        console.log("Task added");
        dispatch({ type: "CREATE_TASK", payload: json.task });
      }
    } catch (error) {
      setError("Failed to add task");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <button type="submit">Add</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default TaskInput;
