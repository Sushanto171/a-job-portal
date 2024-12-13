import { jsPDF } from "jspdf";
import React from "react";
import { useLoaderData } from "react-router-dom";

const JobApply = () => {
  const data = useLoaderData();
  const {
    appliedPhoto,
    appliedName,
    appliedEmail,
    company,
    category,
    jobType,
    title,
  } = data.data;
  console.log(data.data);

  const pdfDownLoadHandler = (e) => {
    const doc = new jsPDF();
    e.preventDefault();
    doc.text(`Name: ${appliedName}`, 10, 10);
    doc.text(`Email: ${appliedEmail}`, 10, 20);
    doc.text(`Photo: ${appliedPhoto}`, 10, 30, { maxWidth: 180 });
    doc.text(`Company Name: ${company}`, 10, 50);
    doc.text(`Job Title: ${title}`, 10, 60);
    doc.text(`Job Category: ${category}`, 10, 70);
    doc.text(`Job Type: ${jobType}`, 10, 80);
    doc.save(`${appliedName}- resume.pdf`);
  };
  return (
    <div className="card w-full max-w-lg mx-auto border p-5 pt-0 bg-base-200 my-5">
      <div className="flex">
        <h4 className="my-5 text-center text-3xl flex-1">Application form</h4>
        <div className=" w-20 ">
          <img className="m-1 pr-4" src={appliedPhoto} alt="" />
        </div>
      </div>
      <form className="flex flex-col gap-2">
        <label className="input input-bordered flex items-center gap-2">
          <span>Name:</span>
          <input
            type="text"
            className="grow"
            defaultValue={appliedName}
            required
            placeholder="Applied name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Email:</span>
          <input
            type="email"
            className="grow"
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
            defaultValue={appliedPhoto}
            required
            placeholder="Applied Photo"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Company:</span>
          <input
            type="text"
            className="grow"
            value={company}
            readOnly
            required
            placeholder="company name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Job title:</span>
          <input
            type="text"
            className="grow"
            value={title}
            readOnly
            required
            placeholder="company name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Job category:</span>
          <input
            type="text"
            className="grow"
            value={category}
            readOnly
            required
            placeholder="company name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Job type:</span>
          <input
            type="text"
            className="grow"
            value={jobType}
            readOnly
            required
            placeholder="company name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Linkedin:</span>
          <input
            type="url"
            className="grow"
            required
            placeholder="Linkedin Profile Url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Github:</span>
          <input
            type="url"
            className="grow"
            required
            placeholder="Github Profile Url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span>Resume:</span>
          <input
            type="url"
            className="grow"
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
