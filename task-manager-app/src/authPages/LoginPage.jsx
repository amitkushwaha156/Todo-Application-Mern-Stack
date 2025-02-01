import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      setSubmitting(true); // Disable button during API call
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { email, password });

      // Save user data & token
      localStorage.setItem("UserName", response.data.data.name);
      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.data));

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false); // Enable button after request
    }
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen flex items-center justify-center">
      <div className=" border border-gray-300 dark:border-gray-600  p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-500 text-center mb-6">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700">Email Address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Password Input */}
              <div className="mb-6 relative">
                <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                <Field
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                <button
                  type="button"
                  className="absolute mt-4 right-3 transform -translate-y-1/3 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <AiOutlineEyeInvisible className="w-5 h-5" />  : <AiOutlineEye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full p-2 rounded-md mt-4 text-white ${isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button className="text-indigo-600 hover:underline" onClick={() => navigate("/Register")}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
