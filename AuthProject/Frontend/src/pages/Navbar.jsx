import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { handleError, handleSuccess } from '../utils/utilsToast'
import { ToastContainer } from 'react-toastify'

const Navbar = () => {
  const {userData, logOut} = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const isUser = true
  const user = {
    name: userData?.name,
    email: userData?.email,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  }

    async function handleLogout() {
       try {
        await logOut()
        handleSuccess("Logout Successfully")
        setTimeout(()=> {
            navigate("/login")
        }, 1000)
       } catch (error) {
            handleError(err.response?.data?.message || "LogOut Failed")
       }
    }

  return (
    <nav className="fixed w-full z-50 top-0 bg-linear-to-b from-slate-950 via-slate-950/95 to-transparent backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AuthFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Contact
            </a>
          </div>

          {/* CTA Buttons - Conditional rendering */}
          {!isUser ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="px-6 py-2 text-gray-300 hover:text-white border border-purple-400/50 rounded-lg transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/10 font-medium">
                Login
              </Link>
              <Link to="/singup" className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4 relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/10 transition-all duration-200"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-purple-400 hover:border-blue-400 transition-colors"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-purple-400/50 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-purple-400/20">
                    <p className="text-white font-semibold text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <a href="#profile" className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </a>
                    <a href="#settings" className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </a>
                  </div>
                  <div className="border-t border-purple-400/20 p-2">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all rounded flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8"
          >
            <span className={`w-full h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 max-h-96 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <a href="#home" className="block text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </a>
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="block text-gray-300 hover:text-white transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="block text-gray-300 hover:text-white transition-colors font-medium">
              Contact
            </a>
            
            {!isUser ? (
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/login" className="w-full px-4 py-2 text-gray-300 hover:text-white border border-purple-400/50 rounded-lg transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/10 font-medium">
                  Login
                </Link>
                <Link to="/singup" className="w-full px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-purple-400/20 space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-purple-500/10 rounded-lg">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-purple-400"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
                <a href="#profile" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded transition-colors">
                  Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded transition-colors">
                  Settings
                </a>
                <button className="w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </nav>
  )
}

export default Navbar