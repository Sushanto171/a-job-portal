import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MyJob = () => {
  const { data } = useLoaderData();
  const { email } = useParams();
  const [jobs, setJobs] = useState(data ? data : []);

  const makeSure = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandler(id);
      }
    });
  };

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(
        `https://a-job-portal-server.vercel.app/jobs/${id}`,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      if (res.status === 200) {
        fetch(`https://a-job-portal-server.vercel.app/jobs?hr_email=${email}`)
          .then((res) => res.json())
          .then((data) => setJobs(data.data));

        Swal.fire({
          title: "Deleted success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  if (jobs.length === 0) return <h2>No Job found</h2>;

  return (
    <>
      <div className="overflow-x-auto my-10 w-10/12 mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Deadline</th>
              <th>Application</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr key={job._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={job.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{job.company}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  {job.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {job.category}
                  </span>
                </td>
                <td>{job.applicationDeadline}</td>
                <td>
                  <Link to={`/applications/${job._id}`}>
                    <button className="btn btn-sm">
                      View
                      <span>
                        {job?.applicationCount ? job.applicationCount : 0}
                      </span>
                    </button>
                  </Link>
                </td>
                <th>
                  <Link to={`/my-job/${job._id}`}>
                    <button className="btn btn-xs ">Update</button>
                  </Link>
                  <button
                    className="btn btn-xs text-error "
                    onClick={() => makeSure(job._id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyJob;
