import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, email, password } = values;

    try {
      setSubmitting(true); // Disable button
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        name,
        email,
        password,
      });
      toast.success("Sign Up successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Sign Up failed");
    } finally {
      setSubmitting(false); // Enable button
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 dark:border-gray-600  bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-500 text-center mb-6">Sign Up</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-gray-700">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className=" w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="    w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full p-2 rounded-md mt-4 text-white ${isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Back to Login */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Back to{" "}
          <button className="text-blue-600 hover:underline" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
