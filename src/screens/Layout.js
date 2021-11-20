import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
