import { createBrowserRouter } from "react-router-dom";
import JobApply from "../components/JobApply/JobApply";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import LogIn from "../pages/LogIn/LogIn";
import MyApplication from "../pages/MyApplication/MyApplication";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
        path: "/my-recruitment/:email",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/job-apply/${params.email}`),
        element: (
          <ProtectedRoute>
            {" "}
            <MyApplication />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/jobs/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs?id=${params.id}`),
        element: (
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs-apply/:id/:email",
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/jobs-applied?id=${params.id}&email=${params.email}`
          ),
        element: (
          <ProtectedRoute>
            <JobApply />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
