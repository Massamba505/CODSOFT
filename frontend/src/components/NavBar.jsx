import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import {useAuthContext} from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {authUser,setAuthUser} = useAuthContext();

  const handleLogout = async() => {
    const res = await fetch("/api/auth/logout",{
      method: "POST",
      headers: {"Content-Type":"application/json"}
    });
    const data = await res.json();
    if(data.error){
        throw new Error(data.error);
    }

    localStorage.removeItem("chat-app");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          Home
        </Link>
        <div>
          {authUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 ml-4"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
