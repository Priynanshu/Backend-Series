import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils/utilsToast';
import {ToastContainer} from "react-toastify"

const Register = () => {
  const navigate = useNavigate()
  const { register } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await register(formData);

      handleSuccess(response?.message || "Sign Up Successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      handleError(err?.response?.data?.message || "Sign Up Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#0b111b] text-white flex flex-col items-center px-5 pb-10">

      {/* Main Container */}
      <div className="w-full max-w-125 mt-10 text-center">
        <h1 className="text-4xl sm:text-[2.2rem] font-bold mb-2 tracking-tight">
          Create your account
        </h1>
        <p className="text-[#9ca3af] mb-8">
          Start organizing your tasks and projects today.
        </p>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center gap-2.5 bg-[#101827] border border-[#374151] py-3 rounded-lg text-[0.95rem] font-medium hover:bg-[#1f2937] transition-all">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" width="18" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2.5 bg-[#101827] border border-[#374151] py-3 rounded-lg text-[0.95rem] font-medium hover:bg-[#1f2937] transition-all">
            <i className="fab fa-github text-lg"></i>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center text-[#9ca3af] text-[0.75rem] uppercase tracking-widest mb-6 before:content-[''] before:flex-1 before:h-px before:bg-[#374151] before:mr-4 after:content-[''] after:flex-1 after:h-px after:bg-[#374151] after:ml-4">
          Or register with email
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value })
              }}
              placeholder="Enter your full name"
              className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-3 px-4 outline-none focus:border-[#2563eb] transition-all"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
              }}
              placeholder="name@company.com"
              className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-3 px-4 outline-none focus:border-[#2563eb] transition-all"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value })
                }}
                placeholder="Create a password"
                className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-3 px-4 outline-none focus:border-[#2563eb] transition-all"
              />
              <button
                type="button" 
                onClick={togglePasswordVisibility}
                className="relative" 
              >
                {showPassword ? (
                  <i className="far fa-eye-slash absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] cursor-pointer hover:text-white transition-colors"></i>
                ) : (
                  <i className="far fa-eye absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] cursor-pointer hover:text-white transition-colors"></i>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 rounded-lg font-semibold text-base mt-4 transition-colors">
            {isLoading ? "creating account..." : "Create Account"}
          </button>

          <p className=" text-sm text-[#9ca3af]">
            Already have an account? <Link to="/login" className="text-[#3b82f6] font-semibold hover:underline ml-1">LogIn</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;