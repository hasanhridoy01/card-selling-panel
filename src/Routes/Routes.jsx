import React, { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/user-forms/Login";
import ForgotPassword from "../pages/user-forms/ForgotPassword";
import Role from "../pages/Role/Role";
import Permission from "../pages/Permission/Permission";
import AddRole from "../pages/Role/AddRole";
import UpdateRole from "../pages/Role/UpdateRole";
import { AuthContext } from "../context/AuthContext";
import Users from "../pages/Users/Users";

function PrivateRoute({ children }) {
  const { card_selling_admin_panel } = useContext(AuthContext);
  // console.log("card_selling_admin_panel?.data?.token", card_selling_admin_panel);
  return card_selling_admin_panel?.access_token ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function RedirectToHome({ children }) {
  const { card_selling_admin_panel } = useContext(AuthContext);
  return !card_selling_admin_panel?.access_token ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/permision",
        element: <Permission />,
      },
      {
        path: "/add-role",
        element: <AddRole />,
      },
      {
        path: "/update-role",
        element: <UpdateRole />,
      },
      {
        path: '/user',
        element: <Users />
      }
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectToHome>
        <Login />
      </RedirectToHome>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
