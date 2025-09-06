import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or Email is required";
    } else if (
      !/^[\w.@]+$/.test(formData.usernameOrEmail) ||
      (formData.usernameOrEmail.includes("@") &&
        !/\S+@\S+\.\S+/.test(formData.usernameOrEmail))
    ) {
      newErrors.usernameOrEmail = "Enter a valid username or email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      // Proceed with API call here
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Login
        </h1>

        {/* Username or Email */}
        <div className="mb-4">
          <label
            htmlFor="usernameOrEmail"
            className="block text-base font-medium text-gray-700 mb-1"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            placeholder="Enter your username or email"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-base ${
              errors.usernameOrEmail
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.usernameOrEmail && (
            <p className="text-base text-red-600 mt-1 font-semibold">
              * {errors.usernameOrEmail}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-base ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-base text-blue-600 hover:underline focus:outline-none font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-base text-red-600 mt-1 font-semibold">
              * {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold text-base rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="text-base text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 font-semibold text-base hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
