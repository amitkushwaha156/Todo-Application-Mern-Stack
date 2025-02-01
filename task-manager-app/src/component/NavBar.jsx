import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/UserSlice";
import ColorModeButton from "./ColorModeButton";
import { AiOutlineLogout } from "react-icons/ai";

const NavBar = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const loginUser = localStorage.getItem("UserName");

  const handleLogout = async () => {
    try {
      // Remove token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("UserName");

      // Call the logout API
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`);

      // Show toast notification
      toast.success("Logout Successfully");

      // Dispatch the logout action to reset Redux state
      dispatch(logout());

      // Navigate to login page
      navigation("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    // Check if token exists in localStorage; if not, navigate to login
    const token = localStorage.getItem("token");
    if (!token) {
      navigation("/login");
    }
  }, [navigation]);

  return (
    <nav className="bg-white  dark:text-white dark:bg-black  shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
        
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">
                Hi! {loginUser}
              </h1>
            </div>

              <div className="flex space-x-4">
                <ColorModeButton/>
                <button
                  onClick={handleLogout}
                  className="text-gray-900   dark:text-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                 <span><AiOutlineLogout className="w-5 h-5 " /> </span>
                 
                </button>

              </div>
        
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
