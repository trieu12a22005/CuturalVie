import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {Avatar, Dropdown, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/auth/Login";
import "./style.css";
import Register from "../../pages/auth/Register";
import { notifySuccess } from "../../utils/notify";
const items = [
  { label: "Trang chủ", key: "home", path: "/home" },
  { label: "Cultural Journey", key: "cultural", path: "/start" },
  { label: "Cộng đồng", key: "community", path: "/community" },
  { label: "Khơi nguồn tri thức", key: "contact", path: "/contact" },
];

const Header = ({tab}) => {
  const location = useLocation();
  const newToken = localStorage.getItem("accessToken")
  const searchParams = new URLSearchParams(location.search);
  const loginMode = searchParams.get('login'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", avatar: "" });
  const [showLoginModal, setShowLoginModal] = useState(Boolean(loginMode) && !newToken);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"))
    if (newToken) {
      setIsLoggedIn(true);
      setUserInfo({
        name: localStorage.getItem("name"),
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJF7sVh67zp0MmU1w8UaRV9j_vZ0v9-ecYA&s",
      });
    } else {
      setIsLoggedIn(false);
    }
  }, [token, newToken]);
  const switchToRegister = () => {
    setShowLoginModal(false);
    setTimeout(() => {
      setShowRegisterModal(true);
    }, 300);
  };
  const handleClick = async() =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`,{
      credentials: "include"
    })
    if (response)
    {
      localStorage.removeItem("accessToken");
      setToken(localStorage.getItem("accessToken"))
      notifySuccess("Đăng xuất thành công")
    }
  }
  const userMenu = (
    <Menu className="font-[Lora] text-[16px]">
      <Menu.Item key="1" className="hover:!bg-[#02542D] hover:!text-white">
        <Link to="/profile">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="2" className="hover:!bg-[#02542D] hover:!text-white">
        <Link to="/achievement">Thành tích</Link>
      </Menu.Item>
      <Menu.Item key="3" className="hover:!bg-[#02542D] hover:!text-white">
        <Link to="/profile/post">Bài đã đăng</Link>
      </Menu.Item>
      <Menu.Item key="4" className="hover:!bg-[#02542D] hover:!text-white">
        <Link to="/feedback">Ý kiến đóng góp</Link>
      </Menu.Item>
      <Menu.Item key="5" className="hover:!bg-red-600 hover:!text-white">
        <div onClick={handleClick}>Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
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
              className={`relative pb-2 border-b-2 transition-all ${
                location.pathname === item.path || tab===item.path
                  ? "border-[#02542D] text-[#02542D]"
                  : "border-transparent hover:border-[#02542D] hover:text-[#02542D]"
              }`}
            >
              <Link to={item.path || "#"}>{item.label}</Link>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="flex items-center justify-center align-center mr-[50px] text-[20px]">
          {isLoggedIn ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="flex items-center mr-[20px] gap-2 cursor-pointer">
                <Avatar
                  size={40}
                  src={localStorage.getItem("avatar") || null}
                  icon={!userInfo. avatar && <UserOutlined />}
                  style={{ backgroundColor: "#87d068" }}
                />
                <p className="font-semibold ml-[10px]">{userInfo.name}</p>
              </div>
            </Dropdown>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#009951] text-white p-[6px] text-[16px] rounded"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </header>

      {/* Modal Login */}
      <Modal
        title={null}
        open={showLoginModal}
        className="custom-login-modal"
        onCancel={() => setShowLoginModal(false)}
        footer={null}
        centered
        closeIcon={false}
        maskClosable={true}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 👈 Làm nền tối mờ hơn
          backdropFilter: "blur(2px)", // 👈 Hiệu ứng làm mờ nền (nếu muốn thêm blur)
        }}
      >
        <Login
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={switchToRegister}
        />
      </Modal>
      {/* Modal Register */}
      <Modal
        title={null}
        open={showRegisterModal}
        className="custom-login-modal"
        onCancel={() => setShowRegisterModal(false)}
        footer={null}
        centered
        closeIcon={false}
        maskClosable={true}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 👈 Làm nền tối mờ hơn
          backdropFilter: "blur(2px)", // 👈 Hiệu ứng làm mờ nền (nếu muốn thêm blur)
        }}
      >
        <Register
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setTimeout(() => setShowLoginModal(true), 300);
          }}
        />
      </Modal>
    </>
  );
};

export default Header;
