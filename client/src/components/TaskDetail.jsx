import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Checkbox, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TaskDetail = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleCheckboxChange = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "TOGGLE_TASK", payload: task });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveChanges = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editedTitle }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TASK", payload: json });
    }
    setIsEditing(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await saveChanges();
  };

  const handleBlur = async () => {
    if (editedTitle !== task.title) {
      await saveChanges();
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: task });
    }
  };

  return (
    <div
      className="task-detail"
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      {!isEditing && (
        <Checkbox checked={task.done} onChange={handleCheckboxChange} />
      )}

      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          style={{ display: "inline", flex: 1 }}
        >
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <h2
          style={{
            textDecoration: task.done ? "line-through" : null,
            margin: 0,
            flex: 1,
          }}
        >
          {task.title}
        </h2>
      )}

      {!isEditing && (
        <>
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default TaskDetail;
