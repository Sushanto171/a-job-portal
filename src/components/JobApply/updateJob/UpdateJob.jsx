import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateJob, setUpdateJob] = useState({});
  useEffect(() => {
    jobLoad();
  }, [id]);
  const jobLoad = async () => {
    try {
      const res = await fetch(
        `https://a-job-portal-server.vercel.app/jobs?id=${id}`
      );
      const { data } = await res.json();
      setUpdateJob(data);
    } catch (error) {}
  };

  const {
    _id,
    title,
    company,
    company_logo,
    location,
    category,
    jobType,
    hr_name,
    hr_email,
    requirements,
    description,
    responsibilities,
    salaryRange,
    applicationDeadline,
  } = updateJob;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateJobIn = {};
    for (const [key, value] of formData.entries()) {
      updateJobIn[key] = value;
    }
    updateJobIn.requirements = updateJobIn.requirements.split("\n");
    updateJobIn.responsibilities = updateJobIn.responsibilities.split("\n");
    updateJobIn.salaryRange = {
      max: updateJobIn.max,
      min: updateJobIn.min,
      currency: updateJobIn.currency,
    };
    const keyToDelete = ["max", "min", "currency"];
    keyToDelete.forEach((key) => {
      delete updateJobIn[key];
    });

    // update job
    try {
      const res = await fetch(
        `https://a-job-portal-server.vercel.app/job/${_id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updateJobIn),
        }
      );
      const data = await res.json();
      if (data.data.modifiedCount > 0) {
        Swal.fire({
          title: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        e.target.reset();
        navigate(-1);
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="w-10/12 mx-auto">
      <h3 className="text-3xl text-center my-5">Update Job</h3>
      <form
        className="card-body grid grid-cols-2 border bg-base-200"
        onSubmit={handleUpdate}
      >
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="type job title"
            defaultValue={title}
            className="input input-bordered"
            required
          />
        </div>
        {/* company name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company</span>
          </label>
          <input
            type="text"
            name="company"
            defaultValue={company}
            placeholder="type company name"
            className="input input-bordered"
            required
          />
        </div>
        {/* company logo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company logo</span>
          </label>
          <input
            type="url"
            name="company_logo"
            defaultValue={company_logo}
            placeholder="type company logo url"
            className="input input-bordered"
            required
          />
        </div>
        {/* location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            placeholder="type location "
            className="input input-bordered"
            required
          />
        </div>
        {/* category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            name="category"
            defaultValue={category}
            placeholder="type category "
            className="input input-bordered"
            required
          />
        </div>
        {/* job type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job type</span>
          </label>
          <input
            type="text"
            name="jobType"
            defaultValue={jobType}
            placeholder="job type  "
            className="input input-bordered"
            required
          />
        </div>
        {/* application deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Deadline</span>
          </label>
          <input
            type="date"
            defaultValue={applicationDeadline}
            name="applicationDeadline"
            placeholder="type deadline"
            className="input input-bordered"
            required
          />
        </div>
        {/* hr name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Hr name</span>
          </label>
          <input
            type="text"
            name="hr_name"
            defaultValue={hr_name}
            readOnly
            placeholder="type hr name"
            className="input input-bordered"
            required
          />
        </div>
        {/* hr email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Hr email</span>
          </label>
          <input
            type="text"
            name="hr_email"
            defaultValue={hr_email}
            readOnly
            placeholder="type hr email"
            className="input input-bordered"
            required
          />
        </div>
        {/* requirements */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">requirements</span>
          </label>

          <textarea
            required
            name="requirements"
            defaultValue={requirements}
            placeholder="each requirement type new line "
            className="textarea textarea-bordered"
          ></textarea>
        </div>
        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>

          <textarea
            required
            name="description"
            defaultValue={description}
            placeholder="each requirement type new line "
            className="textarea textarea-bordered"
          ></textarea>
        </div>
        {/* salary range */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Salary range</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              required
              type="number"
              name="max"
              defaultValue={salaryRange?.max}
              placeholder="max "
              className="textarea textarea-bordered"
            />
            <input
              required
              type="number"
              name="min"
              defaultValue={salaryRange?.min}
              placeholder="min "
              className="textarea textarea-bordered"
            />
            <select
              required
              name="currency"
              defaultValue={salaryRange?.currency}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled>Currency</option>
              <option>Dollar</option>
              <option>BDT</option>
              <option>Inner</option>
              <option>Rupee</option>
            </select>
          </div>
        </div>
        {/* responsibilities */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">responsibilities</span>
          </label>

          <textarea
            required
            name="responsibilities"
            defaultValue={responsibilities}
            placeholder="each requirement type new line "
            className="textarea textarea-bordered"
          ></textarea>
        </div>

        {/* submit  button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UpdateJob;
