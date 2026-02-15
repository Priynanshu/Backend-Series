import React, { useState, useContext } from 'react'
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify'

const VerifyEmail = () => {
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-bt from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl animate-fade-in">
                {/* Header with Icon */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                        <i className="ri-mail-check-line text-3xl text-blue-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        Verify Your Email
                    </h2>
                    <p className="text-sm text-center text-gray-600">
                        We've sent a verification link to your email address. Click the button below to verify your account.
                    </p>
                </div>

                {/* Verification Form */}
                <form className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <i className="ri-information-line text-blue-600 text-lg"></i>
                            <p className="text-sm text-blue-800">
                                A verification link has been sent to your registered email.
                            </p>
                        </div>
                    </div>

                      {/* <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-3 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center space-x-2 ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <i className="ri-loader-4-line animate-spin"></i>
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <i className="ri-check-line"></i>
                                <span>Verify Email</span>
                            </>
                        )}
                    </button> */}
                </form>

                {/*<div className="flex items-center space-x-2">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="space-y-3">
                    {showResend && (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className={`w-full px-4 py-3 text-sm font-semibold rounded-lg transition duration-200 flex items-center justify-center space-x-2 border-2 ${
                                isLoading
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <i className="ri-loader-4-line animate-spin"></i>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <i className="ri-mail-send-line"></i>
                                    <span>Resend Verification Link</span>
                                </>
                            )}
                        </button>
                    )}

                    <p className="text-xs text-center text-gray-600">
                        Didn't receive the email?{' '}
                        {!showResend ? (
                            <button
                                type="button"
                                onClick={() => setShowResend(true)}
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Request again
                            </button>
                        ) : (
                            <span className="text-gray-500">Check your spam folder</span>
                        )}
                    </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-center text-gray-600">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Back to Login
                        </button>
                    </p>
                </div>

                <div className="pt-4 space-y-2 border-t border-gray-200">
                    <div className="flex items-start space-x-3">
                        <i className="ri-shield-check-line text-green-600 text-lg mt-0.5"></i>
                        <p className="text-xs text-gray-600">
                            Your email will be verified securely
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <i className="ri-time-line text-orange-600 text-lg mt-0.5"></i>
                        <p className="text-xs text-gray-600">
                            Verification link expires in 10 minutes
                        </p>
                    </div>
                </div>   */}
            </div>
        </div>
    )
}

export default VerifyEmail