import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const MyJob = () => {
  const { data } = useLoaderData();
  const [jobs, setJobs] = useState(data ? data : []);

  const deleteHandler = (id) => {
    console.log(id);
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
                <th>
                  <Link to={`/my-job/${job._id}`}>
                    <button className="btn btn-xs ">Update</button>
                  </Link>
                  <button
                    className="btn btn-xs text-error "
                    onClick={() => deleteHandler(job._id)}
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
