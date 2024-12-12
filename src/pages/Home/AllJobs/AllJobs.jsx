import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AllJobsCard from "./AllJobsCard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/jobs")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-3xl text-center font-semibold">
        Jobs Of the Day : {jobs.length}
      </h2>
      <motion.div
        animate={{ y: [50, 0] }}
        transition={{
          duration: 1,
          delay: 2,
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

export default AllJobs;
