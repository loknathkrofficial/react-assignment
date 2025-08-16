import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC<{ showHomeLink: boolean }> = (props) => {
  const { showHomeLink } = props;

  const isLoggedIn = !!localStorage?.getItem("isLoggedIn");
  return (
    <div className="w-full flex justify-between flex-row p-3">
      <span className="flex items-center gap-2">
        <img className="w-12" src="/images/logo.png" alt="logo" />
        foo-rum
      </span>
      {!isLoggedIn ? (
        showHomeLink ? (
          <Link to="/">
            <span className="hover:cursor-pointer text-xs font-semibold">
              Back to Home
            </span>
          </Link>
        ) : (
          <Link to="/login">
            <span className="flex items-center gap-2 hover:cursor-pointer">
              Login
              <img className="w-4 h-4" src="/images/login.png" alt="logo" />
            </span>
          </Link>
        )
      ) : (
        <></>
      )}
    </div>
  );
};
export default NavBar;
