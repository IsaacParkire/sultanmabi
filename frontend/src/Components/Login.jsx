// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "" 
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/", 
        formData
      );
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setMessage({ 
        text: "Login successful! Redirecting...", 
        type: "success" 
      });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.detail || 
             "Login failed. Please check your credentials.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://127.0.0.1:8000/api/auth/google/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4e9] to-[#f0e6d2] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e5e5e5]"
      >
        {/* Header with Branding */}
        <div className="bg-[#102542] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white font-serif tracking-wide">Welcome Back</h2>
            <p className="text-white/90 mt-2 text-sm">Sign in to access your account</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg text-center flex items-center justify-center ${
                message.type === "success" 
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                message.type === "success" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
              }`}>
                {message.type === "success" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span>{message.text}</span>
            </motion.div>
          )}

          {/* Social Auth */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium mb-6"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">OR SIGN IN WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                placeholder="Enter your username or email"
                onChange={handleChange}
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A31621]/50 focus:border-[#A31621] transition-all placeholder-gray-400"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A31621]/50 focus:border-[#A31621] transition-all placeholder-gray-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[#A31621] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full p-4 rounded-xl font-medium text-lg transition-colors relative ${
                isLoading
                  ? "bg-[#A31621]/80 cursor-not-allowed"
                  : "bg-[#A31621] hover:bg-[#8a1220] text-white shadow-md"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#A31621] font-medium hover:underline">
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}