import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxios = () => {
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        console.log(error);
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxios;
