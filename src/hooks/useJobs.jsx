import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useJobs = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/jobs");
      setJobs(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { jobs, loading };
};

export default useJobs;
