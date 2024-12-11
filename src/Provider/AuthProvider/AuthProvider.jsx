import { AuthContext } from "../AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value="">{children}</AuthContext.Provider>;
};

export default AuthProvider;
