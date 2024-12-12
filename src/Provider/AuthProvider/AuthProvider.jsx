import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";
import auth from "../../firebase.init/firebase.init";
import { AuthContext } from "../AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (createUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  // sign in with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const authInfo = {
    user,
    signInWithGoogle,
    loading,
    signIn,
    createUser,
    signOutUser,
    setLoading,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
