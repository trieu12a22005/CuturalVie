import React, { useState } from "react";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Avatar } from "antd";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const items = [
    { label: "Trang chủ", key: "home" },
    { label: "Cultural Journey", key: "cultural" },
    { label: "Cộng đồng", key: "community" },
    { label: "Khơi nguồn tri thức", key: "contact" },
  ];

  const handleClick = (key) => {
    setCurrent(key);
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-sm font-[Lora] sticky top-0 z-20">
      {/* Logo */}
      <img
        src="/logo/logo.png"
        alt="Logo"
        className="mt-[-2px] ml-5 mr-12 h-[80px] w-[130px]"
      />

      {/* Menu */}
      <div className="flex space-x-10 text-[18px] font-medium text-gray-700">
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => handleClick(item.key)}
            className={`relative cursor-pointer pb-2 border-b-2 transition-all
        ${
          current === item.key
            ? "border-[#02542D] text-[#02542D]"
            : " border-transparent hover:border-[#02542D] hover:text-[#02542D]"
        }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="flex items-center gap-[30px] mr-[50px] text-[20px]">
        <SearchOutlined className="cursor-pointer" />
        <QuestionCircleOutlined className="cursor-pointer" />
        <div>
          <Badge count={5} size="small">
            <div className="text-[20px] cursor-pointer">
              <BellOutlined />
            </div>
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Avatar
            size={28}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
          <p className="font-semibold">Mẫn Nhi</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
