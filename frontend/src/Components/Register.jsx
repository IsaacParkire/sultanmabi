import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "" 
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/", 
        formData
      );
      setMessage({ text: "Registration successful! You can now log in.", type: "success" });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Registration failed. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth logic here
    window.location.href = "http://127.0.0.1:8000/api/auth/google/";
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-artcaffe-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#F87060] p-6 text-center">
          <h2 className="text-2xl font-serif font-medium text-white">Create Account</h2>
          <p className="text-white/90 mt-1">Join our premium meat community</p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {message && (
            <div className={`mb-6 p-3 rounded-md text-center ${
              message.type === "success" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {message.text}
            </div>
          )}

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mb-6"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full p-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#A31621] hover:bg-[#8a1220] text-white"
              }`}
            >
              {isLoading ? "Processing..." : "Register"}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#D4AF37] hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}