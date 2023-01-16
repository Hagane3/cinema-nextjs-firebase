import React, { useContext } from "react";
import Navigation from "../navigation/Navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import UserContext from "../../context/userContext";

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  const { user, setUserHandler } = useContext(UserContext);

  const logoutUserHandler = () => {
    signOut(auth)
      .then(() => {
        alert("You have been logged out");
        setUserHandler(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navigation isLoggedIn={user} logoutHandler={logoutUserHandler} />
      <main>{children}</main>
    </>
  );
}

export default Layout;
