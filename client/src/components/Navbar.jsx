import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 50px",
        paddingTop: "15px",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <HomeOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          <Title level={3} style={{ margin: 0 }}>
            To Do List
          </Title>
        </Link>
      </div>
    </Header>
  );
};

export default Navbar;
