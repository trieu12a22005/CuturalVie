import React, { Children } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="relative h-screen bg-[url('Background.png')] bg-cover bg-center  w-full flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default Layout;
