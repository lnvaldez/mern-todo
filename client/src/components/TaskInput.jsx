import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { Input, Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TaskInput = () => {
  const { dispatch } = useTasksContext();
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: values.title }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        dispatch({ type: "CREATE_TASK", payload: json.task });
        form.resetFields();
      }
    } catch (error) {
      setError("Failed to add task");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1>Add Todo</h1>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please enter a task" }]}
        >
          <Input
            placeholder="Add task"
            suffix={
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add
              </Button>
            }
          />
        </Form.Item>
      </Form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TaskInput;
