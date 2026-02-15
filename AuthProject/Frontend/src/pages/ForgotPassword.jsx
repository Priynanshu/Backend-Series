import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils/utilsToast'
import { AuthContext } from '../context/AuthProvider'

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {forgotPassword} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const data = await forgotPassword(email)
      handleSuccess(data.message || "We Have sent a email")
      setTimeout(()=> {
        navigate(`/verify-otp/${data.userId}`)
        setEmail("")
      }, 2000)
    } catch(err) {
      handleError(err?.response?.data?.message || "Forgot Password Failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm">We'll help you reset your password in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= 1 ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-400 border border-white/20'}`}>
              1
            </div>
            <p className="text-xs text-gray-400 mt-2">Email</p>
          </div>
          
          <div className={`flex-1 h-1 mx-2 my-5 rounded transition-all duration-300 ${step >= 2 ? 'bg-linear-to-r from-purple-600 to-blue-600' : 'bg-white/10'}`}></div>

          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= 2 ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-400 border border-white/20'}`}>
              2
            </div>
            <p className="text-xs text-gray-400 mt-2">OTP</p>
          </div>

          <div className={`flex-1 h-1 mx-2 my-5 rounded transition-all duration-300 ${step >= 3 ? 'bg-linear-to-r from-purple-600 to-blue-600' : 'bg-white/10'}`}></div>

          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= 3 ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-400 border border-white/20'}`}>
              3
            </div>
            <p className="text-xs text-gray-400 mt-2">Reset</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          
          {/* Step 1: Email */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-white font-semibold mb-3">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
              <p className="text-gray-400 text-sm">We'll send you a verification code to reset your password</p>
              <button onClick={handleSubmit} disabled={isLoading} className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                Send Reset Code
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-white font-semibold mb-3">Verification Code</label>
                <p className="text-gray-400 text-sm mb-3">Enter the 6-digit code sent to your email</p>
                <div className="flex gap-2">
                  <input type="text" maxLength="1" className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg text-white text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="0" />
                  <input type="text" maxLength="1" className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg text-white text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="0" />
                  <input type="text" maxLength="1" className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg text-white text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="0" />
                  <input type="text" maxLength="1" className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg text-white text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="0" />
                  <input type="text" maxLength="1" className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg text-white text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="0" />
                  <input type="text" maxLength="1" className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg text-white text-center font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="0" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">Didn't receive the code? <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">Resend</a></p>
              <button className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Verify Code
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-white font-semibold mb-3">New Password</label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-3">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-200 text-sm">
                  <span className="font-semibold">Password requirements:</span>
                  <br />• At least 8 characters
                  <br />• One uppercase letter
                  <br />• One number
                  <br />• One special character
                </p>
              </div>
              <button className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Reset Password
              </button>
            </div>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Remember your password?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default ForgotPassword