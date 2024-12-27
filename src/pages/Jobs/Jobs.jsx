import { motion } from "framer-motion";
import React from "react";
import useJobs from "../../hooks/useJobs";
import AllJobsCard from "../Home/AllJobs/AllJobsCard";

const Jobs = () => {
  const { jobs, loading } = useJobs();
  if (loading)
    return (
      <h3 className="flex justify-center items-center h-screen">
        Jobs is Loading..
      </h3>
    );
  return (
    <div className="my-8 w-10/12 mx-auto">
      <h2 className="text-3xl text-center font-semibold">
        Jobs Of the Day : {jobs.length}
      </h2>
      <motion.div
        animate={{ y: [50, 0], opacity: [0, 1] }}
        transition={{
          duration: 1,

          ease: "easeInOut",
        }}
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10"
      >
        {jobs.map((job) => (
          <AllJobsCard key={job._id} job={job} />
        ))}
      </motion.div>
    </div>
  );
};

export default Jobs;
