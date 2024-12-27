import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext/AuthContext";
const axiosInstance = axios.create({
  baseURL: "https://a-job-portal-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext);
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        signOutUser().then(() => {
          axiosInstance.post("logOut").then((res) => {
            setLoading(false);
          });
        });
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxios;
