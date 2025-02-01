import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Input, Button, Form, ConfigProvider } from "antd";
import { createStyles } from "antd-style";
import { PlusOutlined } from "@ant-design/icons";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const TaskInput = () => {
  const { styles } = useStyle();
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
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
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter a task" }]}
          >
            <Input
              placeholder="Add task"
              suffix={
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              }
            />
          </Form.Item>
        </Form>
      </ConfigProvider>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TaskInput;
