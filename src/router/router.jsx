import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import Vitaltasks from "../Pages/Vitaltasks";
import Mytasks from "../Pages/Mytasks";
import TaskCategories from "../Pages/TaskCategories";
import Settings from "../Pages/Settings";
import Help from "../Pages/Help";
import ChangeUserPassword from "../Pages/ChangeUserPassword";
import AccountInfo from "../Pages/AccountInfo";
import CreateCategory from "../Pages/CreateCategory";
import EditCategory from "../Pages/EditCategory";
import ProtectedRoute from "../Components/ProtectedRoute";
import Register from "../Pages/Register";
import { routeChangeLoader } from "../api/utils/routerLoaders";

let dashboardTitle = (
  <>
    <span className="text-[#FF6767]">Dash</span>board
  </>
);

let todoTitle = (
  <>
    <span className="text-[#FF6767]">To-</span>Do
  </>
);

let todorouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login />, loader: routeChangeLoader },
      { path: "/register", element: <Register />, loader: routeChangeLoader },
      { path: "/login", element: <Login />, loader: routeChangeLoader },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={dashboardTitle}>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/vitaltaks",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <Vitaltasks />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/mytasks",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <Mytasks />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/tscategories",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <TaskCategories />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/helps",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <Help />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/changepwd",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <ChangeUserPassword />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/accinfo",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <AccountInfo />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/createcat",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <CreateCategory />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/editcat",
        element: (
          <ProtectedRoute>
            <DashboardLayout dashTitle={todoTitle}>
              <EditCategory />
            </DashboardLayout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default todorouter;
