import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ViewApplicant = () => {
  const { data } = useLoaderData();
  const [applications, setApplications] = useState(
    data ? data.map((app) => ({ ...app, status: null })) : []
  );

  const handleAction = (id, action) => {
    setApplications((preApplications) =>
      preApplications.map((app) =>
        app._id === id ? { ...app, status: action } : app
      )
    );
  };
  return (
    <div>
      <h3 className="text-3xl font-bold text-center mb-8">Applicant Info</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="text-center">Links</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, i) => (
              <tr key={application._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={application.applicantInfo.photo}
                          alt={application.applicantInfo.name + "'s photo"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {application.applicantInfo.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    Linkedin: {application?.applicantInfo?.linkedin}
                  </span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Github: {application?.applicantInfo?.github}
                  </span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Resume: {application?.applicantInfo?.resume}
                  </span>
                </td>
                <th>
                  <button
                    onClick={() => handleAction(application._id, "accept")}
                    className={`btn btn-xs ${
                      application.status === "accept" ? "btn-disabled" : ""
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(application._id, "reject")}
                    className={`btn btn-xs ${
                      application.status === "reject" ? "btn-disabled" : ""
                    }`}
                  >
                    Reject
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplicant;