import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import MyApplication from "../pages/MyApplication/MyApplication";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>This is error page</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-application",
        element: <MyApplication />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
