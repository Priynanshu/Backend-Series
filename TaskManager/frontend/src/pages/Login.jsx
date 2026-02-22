import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils/utilsToast';
import {ToastContainer} from "react-toastify"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await login(formData);

      handleSuccess(response?.message || "LogIn Successfully");

      setTimeout(() => {
        navigate("/");
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
    <div className='w-full mt-10 '>
        <div className="min-h-screen w-full bg-[#0b0f17] flex items-center justify-center text-white relative overflow-hidden px-4">
      {/* Background Radial Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at bottom right, rgba(29, 78, 216, 0.15), transparent 40%)' 
        }}
      ></div>

      <div className="w-full max-w-110 p-8 rounded-xl border border-[#1f2937] shadow-2xl text-center z-10 sm:bg-[#111827] bg-transparent sm:border-[#1f2937] border-none">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="bg-[#1e3a8a] text-[#60a5fa] p-2 rounded-lg text-xl">
            <i className="fas fa-check-circle"></i>
          </div>
          <span className="text-2xl font-semibold tracking-tight">TaskFlow</span>
        </div>

        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-[#9ca3af] text-sm mb-8">Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit}>
          {/* Email Group */}
          <div className="text-left mb-5">
            <label className="block text-sm font-medium text-[#d1d5db] mb-2">Email address</label>
            <div className="relative">
              <i className="far fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-sm"></i>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
              }}
                placeholder="name@company.com"
                className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
              />
            </div>
          </div>

          {/* Password Group */}
          <div className="text-left mb-5">
            <label className="block text-sm font-medium text-[#d1d5db] mb-2">Password</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-sm"></i>
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
              }}
                placeholder="••••••••"
                className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-3 pl-10 pr-10 text-sm outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
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

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm mb-6">
            <div className="flex items-center gap-2 text-[#9ca3af]">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-[#1f2937] bg-[#0f172a]" />
              <label htmlFor="remember" className="cursor-pointer">Remember me</label>
            </div>
            <a href="#" className="text-[#3b82f6] hover:underline">Forgot password?</a>
          </div>

          <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-lg font-semibold transition-colors mb-6">
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center text-[#9ca3af] text-xs mb-6 before:content-[''] before:flex-1 before:border-b before:border-[#1f2937] before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-[#1f2937] after:ml-3">
          Or continue with
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 bg-[#1f2937] border border-[#1f2937] py-2.5 rounded-lg text-sm font-medium hover:bg-[#374151] transition-colors">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" width="18" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1f2937] border border-[#1f2937] py-2.5 rounded-lg text-sm font-medium hover:bg-[#374151] transition-colors">
            <i className="fab fa-github text-lg"></i>
            GitHub
          </button>
        </div>

        <p className="mt-8 text-sm text-[#9ca3af]">
          Don't have an account? <Link to="/register" className="text-[#3b82f6] font-semibold hover:underline ml-1">Sign up for free</Link>
        </p>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default Login;