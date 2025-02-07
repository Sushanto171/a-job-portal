import { createBrowserRouter } from "react-router-dom";
import JobApply from "../components/JobApply/JobApply";
import UpdateJob from "../components/JobApply/updateJob/UpdateJob";
import ViewApplicant from "../components/ViewApplicante/ViewApplicante";
import MainLayout from "../MainLayout/MainLayout";
import AddJob from "../pages/AddJob/AddJob";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Jobs from "../pages/Jobs/Jobs";
import LogIn from "../pages/LogIn/LogIn";
import MyApplication from "../pages/MyApplication/MyApplication";
import MyJob from "../pages/myJOb/MyJob";
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
        path: "/my-application/:email",
        element: (
          <ProtectedRoute>
            <MyApplication />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/all-jobs",
        element: <Jobs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/jobs/:id",
        loader: ({ params }) =>
          fetch(`https://a-job-portal-server.vercel.app/jobs?id=${params.id}`),
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
            `https://a-job-portal-server.vercel.app/jobs-applied?id=${params.id}&email=${params.email}`
          ),
        element: (
          <ProtectedRoute>
            <JobApply />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-job",
        element: (
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs/:email",
        loader: ({ params }) =>
          fetch(
            `https://a-job-portal-server.vercel.app/jobs?hr_email=${params.email}`
          ),
        element: (
          <ProtectedRoute>
            <MyJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-job/:id",
        element: (
          <ProtectedRoute>
            <UpdateJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/applications/:job_id",
        loader: ({ params }) =>
          fetch(
            `https://a-job-portal-server.vercel.app/applications/${params.job_id}`
          ),
        element: (
          <ProtectedRoute>
            <ViewApplicant />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
