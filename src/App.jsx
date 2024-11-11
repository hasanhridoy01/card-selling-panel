import { Link, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "./assets/images/logo.png";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import axios from "axios";

import userImage from "./assets/images/UserAvatar.png";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

const App = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const isSubMenuActive = () =>
    ["talktime", "gameCards", "internet", "giftCard"].some((item) =>
      location.pathname.includes(item)
    );

  return (
    <Box sx={{ p: 2, boxSizing: "border-box", height: "Calc(100vh - 32px)" }}>
      <div style={{ display: "flex" }}>
        <Sidebar
          collapsed={collapsed}
          collapsedWidth="80px"
          style={{
            height: "Calc(100vh - 32px)",
            boxShadow: "0px 2px 3px 0px #0000001A",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px",
              margin: "10px 0",
            }}
          >
            {!collapsed && (
              <img
                src={logo}
                alt="Logo"
                style={{
                  transition: "opacity 500ms ease, transform 500ms ease",
                  opacity: collapsed ? 0 : 1,
                  transform: collapsed ? "scale(0.8)" : "scale(1)",
                  width: collapsed ? "0px" : "auto",
                  overflow: "hidden",
                }}
              />
            )}
            <button
              style={{ border: "none", outline: "none", background: "none" }}
            >
              <Switch
                checked={collapsed}
                onChange={() => setCollapsed(!collapsed)}
                inputProps={{ "aria-label": "controlled" }}
                style={{ background: "none" }}
              />
            </button>
          </div>
          <Menu>
            <Link to="dashboard" style={{ textDecoration: "none" }}>
              <MenuItem
                active={isActive("/dashboard")}
                style={{
                  backgroundColor: isActive("/dashboard") ? "#FC2861" : "",
                }}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.83 8.09501L14.28 2.85501C13 1.83501 11 1.82501 9.73002 2.84501L3.18002 8.09501C2.24002 8.84501 1.67002 10.345 1.87002 11.525L3.13002 19.065C3.42002 20.755 4.99002 22.085 6.70002 22.085H17.3C18.99 22.085 20.59 20.725 20.88 19.055L22.14 11.515C22.32 10.345 21.75 8.84501 20.83 8.09501ZM12.75 18.085C12.75 18.495 12.41 18.835 12 18.835C11.59 18.835 11.25 18.495 11.25 18.085V15.085C11.25 14.675 11.59 14.335 12 14.335C12.41 14.335 12.75 14.675 12.75 15.085V18.085Z"
                      fill={isActive("/dashboard") ? "#ffffff" : "#969696"}
                    />
                  </svg>
                }
              >
                <span
                  style={{
                    fontFamily: '"Manrope", serif',
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: isActive("/dashboard") ? "#ffffff" : "#969696",
                  }}
                >
                  Home
                </span>
              </MenuItem>
            </Link>

            <Link to="role" style={{ textDecoration: "none" }}>
              <MenuItem
                active={isActive("/role")}
                style={{
                  backgroundColor: isActive("/role") ? "#FC2861" : "",
                }}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.83 8.09501L14.28 2.85501C13 1.83501 11 1.82501 9.73002 2.84501L3.18002 8.09501C2.24002 8.84501 1.67002 10.345 1.87002 11.525L3.13002 19.065C3.42002 20.755 4.99002 22.085 6.70002 22.085H17.3C18.99 22.085 20.59 20.725 20.88 19.055L22.14 11.515C22.32 10.345 21.75 8.84501 20.83 8.09501ZM12.75 18.085C12.75 18.495 12.41 18.835 12 18.835C11.59 18.835 11.25 18.495 11.25 18.085V15.085C11.25 14.675 11.59 14.335 12 14.335C12.41 14.335 12.75 14.675 12.75 15.085V18.085Z"
                      fill={isActive("/role") ? "#ffffff" : "#969696"}
                    />
                  </svg>
                }
              >
                <span
                  style={{
                    fontFamily: '"Manrope", serif',
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: isActive("/role") ? "#ffffff" : "#969696",
                  }}
                >
                  Role
                </span>
              </MenuItem>
            </Link>

            <Link to="permision" style={{ textDecoration: "none" }}>
              <MenuItem
                active={isActive("/permision")}
                style={{
                  backgroundColor: isActive("/permision") ? "#FC2861" : "",
                }}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.83 8.09501L14.28 2.85501C13 1.83501 11 1.82501 9.73002 2.84501L3.18002 8.09501C2.24002 8.84501 1.67002 10.345 1.87002 11.525L3.13002 19.065C3.42002 20.755 4.99002 22.085 6.70002 22.085H17.3C18.99 22.085 20.59 20.725 20.88 19.055L22.14 11.515C22.32 10.345 21.75 8.84501 20.83 8.09501ZM12.75 18.085C12.75 18.495 12.41 18.835 12 18.835C11.59 18.835 11.25 18.495 11.25 18.085V15.085C11.25 14.675 11.59 14.335 12 14.335C12.41 14.335 12.75 14.675 12.75 15.085V18.085Z"
                      fill={isActive("/permision") ? "#ffffff" : "#969696"}
                    />
                  </svg>
                }
              >
                <span
                  style={{
                    fontFamily: '"Manrope", serif',
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: isActive("/permision") ? "#ffffff" : "#969696",
                  }}
                >
                  Permision
                </span>
              </MenuItem>
            </Link>

            {/* Submenu Example */}
            <SubMenu
              label="Products"
              style={{
                backgroundColor: isSubMenuActive() ? "#FC2861" : "",
                color: isSubMenuActive() ? "#ffffff" : "#969696",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "21px",
                fontFamily: '"Manrope", serif',
              }}
              icon={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.21 7.90502L12.51 12.365C12.2 12.545 11.81 12.545 11.49 12.365L3.78997 7.90502C3.23997 7.58502 3.09997 6.83502 3.51997 6.36502C3.80997 6.03502 4.13997 5.76502 4.48997 5.57502L9.90997 2.57502C11.07 1.92502 12.95 1.92502 14.11 2.57502L19.53 5.57502C19.88 5.76502 20.21 6.04502 20.5 6.36502C20.9 6.83502 20.76 7.58502 20.21 7.90502Z"
                    fill={isSubMenuActive() ? "#ffffff" : "#969696"}
                  />
                  <path
                    d="M11.43 14.225V21.045C11.43 21.805 10.66 22.305 9.97998 21.975C7.91998 20.965 4.44998 19.075 4.44998 19.075C3.22998 18.385 2.22998 16.645 2.22998 15.215V10.055C2.22998 9.26502 3.05998 8.76502 3.73998 9.15502L10.93 13.325C11.23 13.515 11.43 13.855 11.43 14.225Z"
                    fill={isSubMenuActive() ? "#ffffff" : "#969696"}
                  />
                  <path
                    d="M12.57 14.225V21.045C12.57 21.805 13.34 22.305 14.02 21.975C16.08 20.965 19.55 19.075 19.55 19.075C20.77 18.385 21.77 16.645 21.77 15.215V10.055C21.77 9.26502 20.94 8.76502 20.26 9.15502L13.07 13.325C12.77 13.515 12.57 13.855 12.57 14.225Z"
                    fill={isSubMenuActive() ? "#ffffff" : "#969696"}
                  />
                </svg>
              }
            >
              {["talktime", "gameCards", "internet", "giftCard"].map((item) => (
                <MenuItem
                  key={item}
                  active={location.pathname.includes(item)}
                  style={{
                    borderLeft: location.pathname.includes(item)
                      ? "2px solid #FC2861"
                      : "",
                    color: location.pathname.includes(item)
                      ? "#FC2861"
                      : "#969696",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "21px",
                    fontFamily: '"Manrope", serif',
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </MenuItem>
              ))}
            </SubMenu>
          </Menu>
          <div
            style={{
              height: "57px",
              padding: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "absolute",
              gap: collapsed ? "5px" : "10px",
              bottom: "10px",
            }}
          >
            <img src={userImage} alt="" />

            {!collapsed && (
              <h3
                style={{
                  fontFamily: '"Manrope", serif',
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "21px",
                  color: "#2D2D2D",
                }}
              >
                hasan@gmail.com
              </h3>
            )}

            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 6.5C13.3284 6.5 14 5.82843 14 5C14 4.17157 13.3284 3.5 12.5 3.5C11.6716 3.5 11 4.17157 11 5C11 5.82843 11.6716 6.5 12.5 6.5Z"
                stroke="#969696"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 21.5C13.3284 21.5 14 20.8284 14 20C14 19.1716 13.3284 18.5 12.5 18.5C11.6716 18.5 11 19.1716 11 20C11 20.8284 11.6716 21.5 12.5 21.5Z"
                stroke="#969696"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 13.5C13.3284 13.5 14 12.8284 14 12C14 11.1716 13.3284 10.5 12.5 10.5C11.6716 10.5 11 11.1716 11 12C11 12.8284 11.6716 13.5 12.5 13.5Z"
                stroke="#969696"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Sidebar>
        <main
          style={{
            flex: 1,
            padding: "0px 10px",
            width: collapsed ? "Calc(100% - 60px)" : "Calc(100% - 250px)",
            transition: collapsed && "width 500ms",
          }}
        >
          <Outlet />
        </main>
      </div>
    </Box>
  );
};

export default App;
