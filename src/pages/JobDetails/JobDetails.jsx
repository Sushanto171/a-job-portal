import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaComputerMouse } from "react-icons/fa6";
import { PiBagDuotone } from "react-icons/pi";
import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const job = useLoaderData();
  const {
    company_logo,
    company,
    applicationDeadline,
    jobType,
    location,
    title,
    salaryRange,
    requirements,
    category,
  } = job.data;
  console.log(job);
  return (
    <div className="card bg-gray-50 border justify-between border-[#ee542a1e] hover:border-[#ee542a77] hover:-translate-y-[1px] hover:shadow hover:bg-[#ee542a14] duration-200 transition-all">
      <div className="flex items-center gap-1 p-1 pt-4">
        <figure>
          <img className="w-20 h-20" src={company_logo} alt="Shoes" />
        </figure>
        <div>
          <h4 className="text-lg font-bold hover:text-[#EE552A]">{company}</h4>
          <p className="text-xs flex items-center">
            <FaMapMarkerAlt /> {location}
          </p>
        </div>
      </div>
      <div className="p-2">
        <h2 className="text-lg font-semibold hover:text-[#EE552A]">{title}</h2>
        <div className="flex items-center justify-between mt-5">
          <p className=" flex items-center">
            <PiBagDuotone /> {jobType}
          </p>
          <p className="flex items-center">
            <FaComputerMouse />
            {category}
          </p>
        </div>
        <div className="flex  flex-wrap gap-1 mt-5">
          {requirements.map((item, i) => (
            <div className="badge badge- text-xs" key={i}>
              {item}
            </div>
          ))}
        </div>
        <div className=" mt-5 flex justify-between items-center">
          <p className="text-xs">Deadline: {applicationDeadline}</p>

          <button className="btn hover:-translate-y-[2px] hover:bg-[#EE552A] bg-[#FFAD7B] text-white rounded-full hover:shadow-2xl transition-all duration-200">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
