import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { Menu, Badge, Avatar } from "antd";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./style.scss";
const items = [
  {
    label: "Trang chủ",
    key: "home",
  },
  {
    label: "Trang cá nhân",
    key: "personal",
  },
  {
    label: "Cutural Journey",
    key: "cultural",
  },
  {
    label: "Cộng đồng",
    key: "community",
  },
  {
    label: "Hỗ trợ và Liên hệ",
    key: "contact",
  },
];
const Header = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverColor: "#02542D",
            itemSelectedColor: "#02542D",
            itemHeight: 500,
          },
        },
      }}
    >
      <div className="layout__menu">
        <img src="/logo.png" alt="Logo" className="layout__menu-img" />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{
            height: "60px",
            fontSize: "18px",
            marginTop: "10px",
            flex: 1,
          }}
        />
        <div className="layout__menu-tool">
          <div>
            <SearchOutlined />
          </div>
          <div>
            <QuestionCircleOutlined />
          </div>
          <div className="layout__menu-tool-not">
            <Badge count={5}>
              <div>
                <BellOutlined />
              </div>
            </Badge>
          </div>
          <div className=" flex gap-5">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
              size={28}
            />
            <p>
              <b>Mẫn Nhi</b>
            </p>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default Header;