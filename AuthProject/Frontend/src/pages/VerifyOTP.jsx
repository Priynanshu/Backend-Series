import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils/utilsToast'
import { AuthContext } from '../context/AuthProvider'
import { ToastContainer } from 'react-toastify'

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const {id} = useParams()
  const {verifyOTP} = useContext(AuthContext)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if(value && index < 5) {
        inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOTP = async () => {
    const finalOTP = otp.join("")

    if (finalOTP.length !== 6) {
        handleError("Please enter a 6 digit OTP")
        return
    }

    try {
        const data = await verifyOTP(id, finalOTP)

        handleSuccess(data?.message || "OTP Verified Successfully")

        setTimeout(() => {
            navigate(`/change-password/${id}`)
        }, 1000)

    } catch (err) {
        handleError(err?.response?.data?.message || "Something went wrong")
    }

  }

  const clearOTP = () => {
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
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
            <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
            Verify OTP
          </h1>
          <p className="text-gray-400 text-sm">Enter the 6-digit code sent to your email</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          {/* OTP Inputs */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-6 text-center">Verification Code</label>
            <div className="flex justify-center gap-3">
              <input
                type="text"
                maxLength="1"
                value={otp[0]}
                onChange={(e) => handleOtpChange(0, e.target.value)}
                ref={(el)=> inputRefs.current[0] = el}
                className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/20"
                placeholder="0"
              />
              <input
                type="text"
                maxLength="1"
                value={otp[1]}
                onChange={(e) => handleOtpChange(1, e.target.value)}
                ref={(el)=> inputRefs.current[1] = el}
                className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/20"
                placeholder="0"
              />
              <input
                type="text"
                maxLength="1"
                value={otp[2]}
                onChange={(e) => handleOtpChange(2, e.target.value)}
                ref={(el)=> inputRefs.current[2] = el}
                className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/20"
                placeholder="0"
              />
              <input
                type="text"
                maxLength="1"
                value={otp[3]}
                onChange={(e) => handleOtpChange(3, e.target.value)}
                ref={(el)=> inputRefs.current[3] = el}
                className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/20"
                placeholder="0"
              />
              <input
                type="text"
                maxLength="1"
                value={otp[4]}
                onChange={(e) => handleOtpChange(4, e.target.value)}
                ref={(el)=> inputRefs.current[4] = el}
                className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/20"
                placeholder="0"
              />
              <input
                type="text"
                maxLength="1"
                value={otp[5]}
                onChange={(e) => handleOtpChange(5, e.target.value)}
                ref={(el)=> inputRefs.current[5] = el}
                className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/20"
                placeholder="0"
              />
            </div>
          </div>

          {/* Verify Button */}
          <button onClick={handleOTP} className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 mb-4">
            Verify OTP
          </button>
          <button onClick={clearOTP} className='bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 mb-4'>Clear</button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Resend OTP
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              ← Back to Login
            </Link>
          </p>
        </div>
        <ToastContainer />
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

export default VerifyOTP