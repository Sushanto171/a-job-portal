import { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContext";

const ContextProvider = () => {
  return useContext(AuthContext);
};

export default ContextProvider;
