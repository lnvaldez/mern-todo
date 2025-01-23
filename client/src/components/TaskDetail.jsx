const TaskDetail = ({ task }) => {
  const handleCheckboxChange = async () => {
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      console.error("Error updating task");
    }
  };

  return (
    <div className="task-detail">
      <input
        type="checkbox"
        checked={task.complete}
        onChange={handleCheckboxChange}
      ></input>
      <h2>{task.title}</h2>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default TaskDetail;
