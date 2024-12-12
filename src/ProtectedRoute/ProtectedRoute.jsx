import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate state={{ location: pathname }} to="/login" />
    </div>
  );
};

export default ProtectedRoute;
