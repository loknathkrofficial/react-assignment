import React, { useState } from "react";
import SignUp from "./SignUp";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface LoginProps {
  shouldHighlight: boolean;
  handleLoginCallBack?: () => void;
  isSignUpModal?: () => void;
}
const Login: React.FC<LoginProps> = (props) => {
  const { shouldHighlight, handleLoginCallBack, isSignUpModal } = props;

  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage?.getItem("isLoggedIn")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getLoginDatFromLocal = localStorage?.getItem("loginData");
    const getLoginData = getLoginDatFromLocal
      ? JSON.parse(getLoginDatFromLocal)
      : null;
    const isMatch = getLoginData?.find(
      (details: any) =>
        details.username === userName && details.password === password
    );
    if (isMatch) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(!!isMatch?.length);
      handleLoginCallBack && handleLoginCallBack();
      navigate("/");
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="w-[500px] mx-auto">
        <div className="flex flex-col bg-gray-100 mx-auto rounded-2xl w-[450px]">
          <div className=" flex flex-col items-center bg-white m-[10px] rounded-xl p-8">
            <span className="w-9 rounded-full bg-gray-200 p-[8px]">
              <img className="w-9" src="/images/login.png" alt="login" />
            </span>
            <span className="pt-[30px] font-semibold">Sign in to continue</span>
            <span className="text-gray-400 text-sm">
              Sign in to access all the features on this app
            </span>

            <form
              className="w-[350px] pt-[40px]"
              onSubmit={(e) =>
                userName?.length && password?.length && handleSubmit(e)
              }
            >
              <label className="block mb-1 font-medium text-gray-700">
                Email or username
              </label>
              <input
                placeholder="Enter your email or username"
                className="w-full px-3 py-2 border text-sm rounded-lg bg-gray-100 focus:outline-none mb-4"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border text-sm rounded-lg bg-gray-100 focus:outline-none mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg hover:bg-[#0C0082] cursor-pointer ${
                  shouldHighlight ? "bg-[#7EBAF7]" : " bg-[#4838D6]"
                }`}
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="flex justify-center p-2 gap-2 text-gray-400 text-sm">
            Do not have an account?
            <button
              className={`text-blue-600 font-medium ${
                shouldHighlight ? "bg-[#7EBAF7]" : ""
              }`}
              onClick={() =>
                isSignUpModal ? (
                  isSignUpModal()
                ) : (
                  <SignUp shouldHighlight={false} />
                )
              }
            >
              {isSignUpModal ? <>Sign Up</> : <Link to="/signup">Sign Up</Link>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
