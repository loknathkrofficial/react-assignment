import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";

function App() {
  const [showHomeLink, setShowHomeLink] = useState<boolean>(false);
  const [highlight, setHighlight] = useState(false);
  let timeout: any = null;
  useEffect(() => {
    setShowHomeLink(window.location.pathname != "/");
  });

  useEffect(() => {
    const getLoginDatFromLocal = localStorage?.getItem("loginData");
    if (!getLoginDatFromLocal) {
      const loginData = [
        {
          username: "demo@example.com",
          password: "password123",
        },
        {
          username: "test@user.com",
          password: "testpass",
        },
      ];
      localStorage.setItem("loginData", JSON.stringify(loginData));
    }
  }, []);

  const handleClick = () => {
    clearTimeout(timeout);
    if (!!localStorage?.getItem("isLoggedIn")) {
      setHighlight(true);
      timeout = setTimeout(() => setHighlight(false), 500);
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <NavBar showHomeLink={showHomeLink} />
        <Routes>
          <Route
            path="/"
            element={<LandingPage shouldHighlight={highlight} />}
          />
          <Route
            path="/login"
            element={<Login shouldHighlight={highlight} />}
          />
          <Route
            path="/signup"
            element={<SignUp shouldHighlight={highlight} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
