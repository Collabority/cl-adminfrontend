import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/authSlice";
import instance from "../lib/axios";
import { Loader2, Mail, Lock, KeyRound, ArrowRight } from "lucide-react";

const Login = () => {
  const [step, setStep] = useState(1); // 1 = Credentials, 2 = OTP (Admin Only)
  const [authType, setAuthType] = useState(""); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Captured in Step 1
  const [otp, setOtp] = useState("");           // Captured in Step 2 (Admin)
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STEP 1: SUBMIT CREDENTIALS
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Send Email & Password to backend
      // Backend verifies Admin pass & sends OTP. Or identifies User.
      const { data } = await instance.post("/auth/initiate", { email, password });
      
      const type = data.data.type; // 'ADMIN' or 'USER'
      setAuthType(type);

      if (type === "ADMIN") {
        // Password correct. OTP sent. Move to Step 2.
        setStep(2);
      } else {
        // It's a User. We have the password. Log them in immediately.
        await performUserLogin();
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      // Only stop loading if we are NOT proceeding to auto-login a user
      if (authType !== "USER") {
         setLoading(false);
      }
    }
  };

  // HELPER: COMPLETE USER LOGIN
  const performUserLogin = async () => {
    try {
      const response = await instance.post("/auth/user/verify", { email, password });
      finalizeLogin(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP (ADMIN ONLY)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await instance.post("/auth/admin/verify", { email, otp });
      finalizeLogin(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      setLoading(false);
    }
  };

  const finalizeLogin = (data) => {
    const { user, accessToken } = data;
    dispatch(setCredentials({ user, token: accessToken }));
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("token", accessToken);
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Collabority Admin</h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === 1 ? "Sign in to access your dashboard" : "Two-Factor Verification"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* --- STEP 1: EMAIL & PASSWORD --- */}
        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
            </button>
          </form>
        )}

        {/* --- STEP 2: OTP INPUT (ADMIN ONLY) --- */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP sent to Email
              </label>
              
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-purple-500" />
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="123456"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We sent a code to <span className="font-semibold">{email}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify OTP"}
            </button>
            
            <button 
              type="button"
              onClick={() => { setStep(1); setOtp(""); setError(""); }}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-2"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;