import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const SignUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone must be 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const { loading, signup } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    signup(data);
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Sign Up
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-sm ${
              errors.username
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 font-semibold">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-sm ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-sm ${
              errors.phone
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your 10-digit phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 font-semibold">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-sm ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-sm text-blue-600 hover:underline font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? "Registering Admin" : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
