import { useState } from "react";
import Link from "next/link";

import React from "react";
import {
  FilmIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Props = {
  isLoggedIn: boolean;
  logoutHandler: () => void;
};

function Navigation({ isLoggedIn, logoutHandler }: Props) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpened((prevState) => !prevState);
  };

  const hideMenuHandler = () => {
    setIsOpened(false);
  };

  return (
    <nav className="w-full shadow-md flex justify-between py-4 px-2 fixed top-0  z-50 bg-white">
      <Link href="/" onClick={hideMenuHandler}>
        <FilmIcon className="h-8 w-8 ml-4  sm:h-12 sm:w-12 sm:ml-8" />
      </Link>
      <ul className="hidden sm:flex  sm:text-xl lg:text-2xl w-1/2 justify-around items-center ">
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link href="/" onClick={logoutHandler}>
              Log out
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/login">Log in</Link>
          </li>
        )}

        {isLoggedIn ? (
          <li>
            <Link href="/account">
              <UserCircleIcon className="h-10 w-10 hover:cursor-pointer" />
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/signup">Sign up</Link>
          </li>
        )}
      </ul>
      <Bars3Icon
        className="h-8 w-8 mr-4 sm:hidden"
        onClick={toggleMenuHandler}
      />
      <div
        className={`sm:hidden bg-white shadow-xl fixed w-2/3 h-screen top-0 right-0 transition ease-in-out delay-150 ${
          isOpened ? "" : "translate-x-full "
        }`}
      >
        <ul className="h-screen flex flex-col justify-center items-center gap-4 text-2xl">
          {isLoggedIn ? (
            <li>
              <Link href="/account">
                <UserCircleIcon
                  className="h-10 w-10"
                  onClick={hideMenuHandler}
                />
              </Link>
            </li>
          ) : (
            <li onClick={hideMenuHandler}>
              <Link href="/signup">Sign up</Link>
            </li>
          )}

          <li>
            <Link href="/movies" onClick={hideMenuHandler}>
              Movies
            </Link>
          </li>
          {isLoggedIn ? (
            <li onClick={hideMenuHandler}>
              <Link href="/" onClick={logoutHandler}>
                Log out
              </Link>
            </li>
          ) : (
            <li onClick={hideMenuHandler}>
              <Link href="/login">Log in</Link>
            </li>
          )}

          {/* <li>
            <Link href="/account" onClick={hideMenuHandler}>
              My Profile
            </Link>
          </li> */}
        </ul>
        <XMarkIcon
          className="absolute top-0 right-0 h-8 w-8 mx-2 my-4 mr-6"
          onClick={toggleMenuHandler}
        />
      </div>
    </nav>
  );
}

export default Navigation;
