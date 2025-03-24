import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";

function Layout({ bgImage }) {
  const location = useLocation();
  const showHeaderOnPaths = ["/start"];
  const shouldShowHeader = showHeaderOnPaths.includes(location.pathname);

  return (
    <div className="h-screen w-full flex flex-col">
      {shouldShowHeader && <Header />}
      <main
        className="flex-1 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
