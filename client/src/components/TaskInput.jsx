import { useState } from "react";

const TaskInput = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(title),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle("");
      setError(null);
      console.log("Task added");
    }
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default TaskInput;
