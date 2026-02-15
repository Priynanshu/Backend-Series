import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utilsToast';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email.trim() || !password.trim()) {
            return handleError("Email and Password are required");
        }

        try {
            setIsLoading(true);

            const data = await login(formData);

            handleSuccess(data.message || "Login successful");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {
            const message =
                err.response?.data?.message || "Login Failed";
                

            handleError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-linear-to-br from-purple-900 to-gray-900 rounded-xl shadow-2xl border border-purple-500 border-opacity-30">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <i className="ri-login-box-line text-white text-2xl"></i>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-purple-300">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 mt-1 text-white bg-purple-900 bg-opacity-50 border border-purple-500 border-opacity-40 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-purple-400 transition duration-200"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-purple-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="w-full px-4 py-3 mt-1 text-white bg-purple-900 bg-opacity-50 border border-purple-500 border-opacity-40 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-purple-400 transition duration-200"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4 text-purple-300 hover:text-purple-100 transition duration-200"
                            >
                                <i className={showPassword ? "ri-eye-fill" : "ri-eye-off-fill"}></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 mt-6 text-white font-semibold bg-linear-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <i className="ri-loader-4-line animate-spin"></i>
                                Logging in...
                            </>
                        ) : "Login"}
                    </button>
                </form>

                <div className="space-y-3">
                    <p className="text-sm text-center text-purple-300">
                        Create a new account?{" "}
                        <Link to="/singup" className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 hover:underline font-semibold">
                            Sign Up
                        </Link>
                    </p>

                    <p className="text-sm text-center">
                        <Link to="/forgot-password" className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 hover:underline font-semibold">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Login;
