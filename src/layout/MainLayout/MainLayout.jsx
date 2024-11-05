import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/images/logo.png";

const MainLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      {/* Side-Bar */}
      <div
        style={{
          display: "flex",
          height: "auto",
          position: "fixed",
          top: "20px",
          bottom: "20px",
          left: "20px",
        }}
      >
        <Sidebar
          collapsed={collapsed}
          transitionDuration={500}
          style={{
            backgroundColor: "#d4d4d8",
            color: "#969696",
            width: collapsed ? "80px" : "240px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: 'center',
              justifyContent: "space-between",
              padding: "12px",
            }}
          >
            {" "}
            <img src={logo} alt="" />
            <button className="sb-button" onClick={handleCollapseToggle}>
              {collapsed ? "Expand" : "Collapse"}
            </button>
          </div>
          <Menu>
            <MenuItem> Documentation</MenuItem>
            <MenuItem> Calendar</MenuItem>
            <MenuItem> E-commerce</MenuItem>
            <MenuItem> Examples</MenuItem>
          </Menu>
        </Sidebar>
        <main style={{ paddingLeft: 20, width: "100%" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
