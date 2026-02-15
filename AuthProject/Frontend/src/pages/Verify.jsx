import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from '../context/AuthProvider'

const Verify = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const { verifying } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const [status, setStatus] = useState("verifying")
    const [message, setMessage] = useState("Verifying your account...")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                setIsLoading(true)
                const data = await verifying(token)

                if (data.success) {
                    setStatus("success")
                    setMessage("Account Verified Successfully")
                } else {
                    setStatus("failed")
                    setMessage("Verification Failed")
                }

            } catch (err) {
                setStatus("failed")
                setMessage(err.response?.data?.message || "Verification Failed")
            } finally {
                setIsLoading(false)
            }
        }

        if (token) {
            verifyUser()
        } else {
            setStatus("failed")
            setMessage("Invalid verification link")
            setLoading(false)
        }

    }, [token, verifying])


    useEffect(() => {
        if (status === "success") {
            const timer = setTimeout(() => {
                navigate("/login")
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [status, navigate])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-bt from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                {isLoading ? (
                    // Loading State
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                            <i className="ri-loader-4-line text-3xl text-blue-600 animate-spin"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Verifying Your Email
                        </h2>
                        <p className="text-sm text-center text-gray-600">
                            Please wait while we verify your account...
                        </p>
                    </div>
                ) : status === "success" ? (
                    // Success State
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                            <i className="ri-check-line text-3xl text-green-600"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Verification Successful!
                        </h2>
                        <p className="text-sm text-center text-green-600 font-semibold">
                            {message}
                        </p>
                        <p className="text-xs text-center text-gray-600 mt-4">
                            Redirecting to login page...
                        </p>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 animate-pulse" style={{ width: "100%" }}></div>
                        </div>
                    </div>
                ) : (
                    // Error State
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                            <i className="ri-close-line text-3xl text-red-600"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Verification Failed
                        </h2>
                        <p className="text-sm text-center text-red-600 font-semibold">
                            {message}
                        </p>
                        <button
                            onClick={() => navigate("/singup")}
                            className="w-full px-4 py-3 mt-6 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
                        >
                            <i className="ri-arrow-left-line"></i>
                            <span>Back to Sign Up</span>
                        </button>
                    </div>
                )}

                {/* Footer Info */}
                <div className="pt-4 space-y-2 border-t border-gray-200">
                    <div className="flex items-start space-x-3">
                        <i className="ri-shield-check-line text-blue-600 text-lg mt-0.5"></i>
                        <p className="text-xs text-gray-600">
                            Your account is secure and verified
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <i className="ri-mail-check-line text-green-600 text-lg mt-0.5"></i>
                        <p className="text-xs text-gray-600">
                            Email verification completed
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Verify