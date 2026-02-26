
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { handleError, handleSuccess } from '../utils/utilsToast';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const {login} = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await login(formData)   // 👈 yaha store karo

    handleSuccess(response?.message || "Login Successfully")

    setTimeout(() => {
      navigate("/")
    }, 1000)

  } catch (err) {
    handleError(err?.response?.data?.message || "Login Failed")
  }
}

  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/15 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="w-full max-w-md bg-card-dark border border-border-dark rounded-xl shadow-xl shadow-primary/10 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Enter your details to access your blog dashboard.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e)=> {
                  setFormData({...formData, email: e.target.value})
                }}
                className="block w-full pl-10 pr-3 py-3 rounded-lg border border-border-dark bg-surface-dark text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <a className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input 
                type="text" 
                value={formData.password}
                onChange={(e)=> {
                  setFormData({...formData, password: e.target.value})
                }}
                className="block w-full pl-10 pr-10 py-3 rounded-lg border border-border-dark bg-surface-dark text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                placeholder="Enter your password"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
          </div>

          <button type="submit" className="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-primary/25 text-sm font-bold text-background-dark bg-primary hover:bg-primary/90 transition-all duration-200">
            Sign In
          </button>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account? <Link to="/register" className="font-semibold text-primary hover:underline ml-1">Register</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Login;
