
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { handleError, handleSuccess } from '../utils/utilsToast';
import { ToastContainer } from 'react-toastify';

const Register = () => {
  const {register} = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await register(formData)
      handleSuccess("User Register Successfully")
      setTimeout(()=> {
        navigate("/login")
      }, 1000)
    } catch (err) {
      handleError(err?.response?.message || "Sign Up Failed")
    }
  }
  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-md bg-card-dark rounded-xl shadow-2xl shadow-primary/10 border border-border-dark overflow-hidden">
        <div className="px-8 pt-8 pb-2 text-center">
          <div className="mx-auto bg-primary/20 size-12 rounded-full flex items-center justify-center mb-4 text-primary">
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-gray-400 text-sm">Join our community of writers and readers today.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e)=> {
                  setFormData({...formData, name: e.target.value})
                }}
                className="block w-full rounded-lg border border-border-dark bg-surface-dark text-white pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none focus:border-primary transition-all" 
                placeholder="John Doe" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e)=> {
                  setFormData({...formData, email: e.target.value})
                }}
                className="block w-full rounded-lg border border-border-dark bg-surface-dark text-white pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none focus:border-primary transition-all" 
                placeholder="name@example.com" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input 
                type="text" 
                value={formData.password}
                onChange={(e)=> {
                  setFormData({...formData, password: e.target.value})
                }}
                className="block w-full rounded-lg border border-border-dark bg-surface-dark text-white pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none focus:border-primary transition-all" 
                placeholder="Create a password" 
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Must be at least 8 characters.</p>
          </div>

          <div className="pt-2">
            <button type="submit" className="flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold cursor-pointer text-background-dark transition-all hover:bg-primary/90 shadow-lg shadow-primary/25">
              Register
            </button>
          </div>
        </form>
        
        <div className="border-t border-border-dark px-8 py-4 bg-surface-dark/50 text-center">
          <p className="text-sm text-gray-400">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline ml-1">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Register;
