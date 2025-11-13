import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import instance from "../lib/axios";

const Login = () => {
  const { loginUser, loading } = useLogin();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [loader, setLoader] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Improved validation logic
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

    if (showOTP && !formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    await loginUser({
      email: formData.usernameOrEmail,
      password: formData.password,
      otp: formData.otp,
    });
    // You can handle login response here (redirect, etc.)
  };

  const handleGetOTP = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoader(true);
      const response = await instance.post("/admin/sendEmail", {
        email: formData.usernameOrEmail,
        password: formData.password,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || "Failed to send OTP.");
      }
      setShowOTP(true);
      setOtpSent(true);
    } catch (err) {
      setErrors({ otp: err.message || "Failed to send OTP." });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700 tracking-tight">
          Admin Login
        </h1>

        {/* Username or Email */}
        <div className="mb-6">
          <label
            htmlFor="usernameOrEmail"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            autoComplete="username"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            placeholder="Enter your username or email"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-base transition ${
              errors.usernameOrEmail
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.usernameOrEmail && (
            <p className="text-sm text-red-600 mt-1 font-semibold">
              {errors.usernameOrEmail}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-semibold text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-base transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-base text-blue-600 hover:underline focus:outline-none font-semibold"
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1 font-semibold">
              {errors.password}
            </p>
          )}
        </div>

        {/* OTP */}
        {showOTP && (
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-base font-semibold text-gray-700 mb-2"
            >
              OTP
            </label>
            <input
              type="password"
              id="otp"
              autoComplete="one-time-code"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter the OTP"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-base transition ${
                errors.otp
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.otp && (
              <p className="text-sm text-red-600 mt-1 font-semibold">
                {errors.otp}
              </p>
            )}
            {otpSent && !errors.otp && (
              <p className="text-xs text-green-600 mt-1 font-semibold">
                OTP sent to your email.
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="mb-4">
          {showOTP ? (
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-3 bg-blue-600 text-white font-semibold text-base rounded-lg hover:bg-blue-700 transition-all duration-200 shadow"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGetOTP}
              className="w-full py-3 bg-blue-600 text-white font-semibold text-base rounded-lg hover:bg-blue-700 transition-all duration-200 shadow"
              disabled={loader}
            >
              {loader ? "Sending OTP..." : "Get OTP"}
            </button>
          )}
        </div>

        {/* Sign up link */}
        {/* <p className="text-base text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 font-semibold text-base hover:underline"
          >
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
