import { jsPDF } from "jspdf";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const JobApply = () => {
  const { data } = useLoaderData();
  const {
    appliedPhoto,
    appliedName,
    appliedEmail,
    _id,
    company,
    title,
    category,
    jobType,
  } = data;

  const pdfDownLoadHandler = () => {
    const doc = new jsPDF();

    doc.text(`Name: ${appliedName}`, 10, 10);
    doc.text(`Email: ${appliedEmail}`, 10, 20);
    doc.text(`Photo: ${appliedPhoto}`, 10, 30, { maxWidth: 180 });
    doc.text(`Company Name: ${company}`, 10, 50);
    doc.text(`Job Title: ${title}`, 10, 60);
    doc.text(`Job Category: ${category}`, 10, 70);
    doc.text(`Job Type: ${jobType}`, 10, 80);
    doc.save(`${appliedName}- resume.pdf`);
  };

  const applyFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const applicantInfo = {};
    for (const [key, value] of formData.entries()) {
      applicantInfo[key] = value;
    }
    data.applicantInfo = applicantInfo;

    data.job_id = _id;
    const deleteToKey = ["_id", "appliedEmail", "appliedName", "appliedPhoto"];
    deleteToKey.forEach((key) => {
      delete data[key];
    });
    try {
      fetch("https://a-job-portal-server.vercel.app/job-apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            title: data.message,
            timer: 2000,
            showConfirmButton: false,
          });
        });
    } catch (error) {}
  };
  return (
    <div className="card w-full max-w-lg mx-auto border p-5 pt-0 bg-base-200 my-5">
      <div className="flex">
        <h4 className="my-5 text-center text-3xl flex-1">Application form</h4>
        <div className=" w-20 ">
          <img className="m-1 pr-4" src={appliedPhoto} alt="" />
        </div>
      </div>
      <form onSubmit={applyFormHandler} className="flex flex-col gap-2">
        <label className="input input-bordered flex items-center gap-2">
          <span>Name:</span>
          <input
            type="text"
            className="grow"
            name="name"
            readOnly
            defaultValue={appliedName}
            required
            placeholder="Applied name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            className="grow"
            readOnly
            defaultValue={appliedEmail}
            required
            placeholder="Applied email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Photo URL:</span>
          <input
            type="url"
            className="grow"
            name="photo"
            defaultValue={appliedPhoto}
            required
            placeholder="Applied Photo"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Linkedin:</span>
          <input
            type="url"
            className="grow"
            required
            name="linkedin"
            placeholder="Linkedin Profile Url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Github:</span>
          <input
            type="url"
            className="grow"
            required
            name="github"
            placeholder="Github Profile Url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Resume:</span>
          <input
            type="url"
            className="grow"
            name="resume"
            required
            placeholder="Resume Url"
          />
        </label>
        <div>
          <button className="btn hover:-translate-y-[2px] hover:bg-[#EE552A] bg-[#FFAD7B] text-white rounded-full hover:shadow-2xl transition-all duration-200">
            Apply now
          </button>
          <button
            onClick={pdfDownLoadHandler}
            type="button"
            className="btn hover:-translate-y-[2px] hover:bg-[#EE552A] bg-[#FFAD7B] text-white rounded-full hover:shadow-2xl transition-all duration-200 o"
          >
            Download now
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;
