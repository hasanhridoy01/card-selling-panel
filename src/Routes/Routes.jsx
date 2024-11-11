import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/user-forms/Login";
import ForgotPassword from "../pages/user-forms/ForgotPassword";
import Role from "../pages/Role/Role";
import Permission from "../pages/Permission/Permission";
import AddRole from "../pages/Role/AddRole";
import UpdateRole from "../pages/Role/UpdateRole";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/role",
        element: <Role />
      },
      {
        path: '/permision',
        element: <Permission />
      },
      {
        path: '/add-role',
        element: <AddRole />
      },
      {
        path: '/update-role',
        element: <UpdateRole />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
