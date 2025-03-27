import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import MyLayout from "../../components/Layout";
function Layout() {
  return (
    <>
      <MyLayout url={"/bg/bg1.png"}>
        <Outlet />
      </MyLayout>
    </>
  );
}

export default Layout;
