import Swal from "sweetalert2";

const AddJob = () => {
  const handleForm = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    const jobData = {};
    for (const [key, value] of formData) {
      jobData[key] = value;
    }
    jobData.requirements = jobData.requirements.split("\n");
    jobData.responsibilities = jobData.responsibilities.split("\n");
    jobData.salaryRange = {
      max: jobData.max,
      min: jobData.min,
      currency: jobData.currency,
    };
    const keysToDelete = ["max", "min", "currency"];
    keysToDelete.forEach((key) => {
      delete jobData[key];
    });
    // console.log(jobData);
    // make a job by input jobData
    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(jobData),
      });
      const data = await res.json();
      data.data.insertedId &&
        Swal.fire({
          title: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
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
      <h3 className="text-3xl text-center my-5">Add Job</h3>
      <form
        className="card-body grid grid-cols-2 border bg-base-200"
        onSubmit={handleForm}
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
              placeholder="max "
              className="textarea textarea-bordered"
            />
            <input
              required
              type="number"
              name="min"
              placeholder="min "
              className="textarea textarea-bordered"
            />
            <select
              required
              name="currency"
              defaultValue="Currency"
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

export default AddJob;
