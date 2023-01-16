import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import UserContext from "../context/userContext";

export const useActiveUser = () => {
  const { setUserHandler } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserHandler(user);
      } else {
        setUserHandler(null);
      }
    });
  }, []);
};
