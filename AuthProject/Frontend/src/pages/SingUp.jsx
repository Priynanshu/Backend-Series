import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import 'remixicon/fonts/remixicon.css'
import { AuthContext } from '../context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils/utilsToast';
import { handleSuccess } from '../utils/utilsToast';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { register } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, email, password } = formData
        if (!name.trim() || !email.trim() || !password.trim()) {
            return handleError("name, email and password is require");
        }

        try {
            setIsLoading(true)
            await register(formData)
            handleSuccess("Registration successful");
            setTimeout(() => {
                navigate("/verify")
            }, 1000)
        } catch (err) {
            const message =
                err.response?.data?.message || "Something went wrong";

            handleError.error(message);
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-linear-to-br from-purple-900 to-gray-900 rounded-xl shadow-2xl animate-fade-in border border-purple-500 border-opacity-30">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <i className="ri-user-add-line text-white text-2xl"></i>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">Create Account</h2>
                    <p className="text-sm text-purple-300">Join us to get started</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value })
                            }}
                            id="name"
                            className="w-full px-4 py-3 mt-1 text-white bg-purple-900 bg-opacity-50 border border-purple-500 border-opacity-40 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-purple-400 transition duration-200"
                            placeholder="Enter Your Fullname"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                            }}
                            id="email"
                            className="w-full px-4 py-3 mt-1 text-white bg-purple-900 bg-opacity-50 border border-purple-500 border-opacity-40 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-purple-400 transition duration-200"
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value })
                                }}
                                className="w-full px-4 py-3 mt-1 text-white bg-purple-900 bg-opacity-50 border border-purple-500 border-opacity-40 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-purple-400 transition duration-200"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-4 text-purple-300 hover:text-purple-100 transition duration-200"
                            >
                                {showPassword ? (
                                    <i className="ri-eye-fill" height="20"></i>
                                ) : (
                                    <i className="ri-eye-off-fill" height="20"></i>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 mt-6 text-white font-semibold bg-linear-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {
                            isLoading ? (
                                <>
                                    <i className="ri-loader-4-line animate-spin" height="20"></i>
                                    Creating account...
                                </>
                            ) : "Sign Up"
                        }
                    </button>
                </form>
                <div className="space-y-3">
                    <p className="text-sm text-center text-purple-300">
                        Already have an account?{' '}
                        <Link to="/login" className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 hover:underline font-semibold">
                            Log In
                        </Link>
                    </p>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;



