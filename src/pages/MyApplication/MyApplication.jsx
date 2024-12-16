import { useLoaderData } from "react-router-dom";

const MyApplication = () => {
  const { data: application } = useLoaderData();
  const { data } = application;

  if (data.length === 0) {
    return <h1 className="w-10/12 mx-auto">No data found</h1>;
  }
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((job, i) => (
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
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td
                  className={`${
                    job?.status === "accept" ? "text-green-500" : " text-error"
                  }`}
                >
                  {job?.status ? (
                    job.status === "accept" ? (
                      "Accepted"
                    ) : (
                      "Rejected"
                    )
                  ) : (
                    <span className="text-gray-600"> Pending...</span>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyApplication;
