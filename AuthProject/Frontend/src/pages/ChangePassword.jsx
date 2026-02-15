import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/utilsToast';
import { AuthContext } from '../context/AuthProvider';
import { ToastContainer } from 'react-toastify';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { changePassword } = useContext(AuthContext)
    const [emailVal, setEmailVal] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { id } = useParams()


    const handleChangePassword = async () => {

        if (!emailVal || !newPassword || !confirmPassword) {
            handleError("Please fill all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            handleError("Passwords do not match")
            return
        }


        try {
            setIsLoading(true)
            const data = await changePassword(id, emailVal, newPassword, confirmPassword)

            handleSuccess(data?.message || "Password Changed Successfully")

            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {
            handleError(error.response?.data?.message || "Something went wrong")
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
                        <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                        Change Password
                    </h1>
                    <p className="text-gray-400 text-sm">Update your password to keep your account secure</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
                    {/* email */}
                    <div>
                        <label className="block text-white font-semibold mb-3">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={emailVal}
                                onChange={(e) => setEmailVal(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                        </div>

                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-white font-semibold mb-3">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                <i className={showPassword ? "ri-eye-fill" : "ri-eye-off-fill"}></i>
                            </button>
                        </div>

                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-white font-semibold mb-3">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                <i className={showPassword ? "ri-eye-fill" : "ri-eye-off-fill"}></i>
                            </button>
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-blue-200 text-sm font-semibold mb-3">Password Requirements:</p>
                        <ul className="space-y-2 text-sm text-blue-200/80">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Minimum 8 characters
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                One uppercase letter (A-Z)
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                One number (0-9)
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                One special character (!@#$%^&*)
                            </li>
                        </ul>
                    </div>

                    {/* Change Password Button */}
                    <button type='button' onClick={handleChangePassword} className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                        {isLoading ? "changing..." : "Change Password"}
                    </button>

                    {/* Cancel Link */}
                    <div className="text-center">
                        <Link to="/login" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                            Cancel
                        </Link>
                    </div>
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

export default ChangePassword