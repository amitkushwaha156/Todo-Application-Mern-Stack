import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/UserSlice";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineLogout } from "react-icons/ai";

const NavBar = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const UserDetails = useSelector((state) => state.user);
  // console.log(UserDetails)
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
          <div className="flex-shrink-0 flex">
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mr-2"
              loading="lazy"
              src="https://avatar.iran.liara.run/public/boy"
              alt="Rounded avatar"
            />
            <h1 className="text-2xl font-bold text-indigo-600 mt-1">
              Hi! {UserDetails.name || loginUser}
            </h1>
          </div>

          <div className="flex space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="inline-flex items-center ml-2 text-sm font-medium text-blue-600 md:ml-2 dark:text-blue-500 hover:underline"
            >
              Logout <AiOutlineLogout className="w-3 h-3 mx-1 mt-1" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
