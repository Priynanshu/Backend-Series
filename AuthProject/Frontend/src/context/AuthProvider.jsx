import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { handleError } from '../utils/utilsToast'
import axios from "axios"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    async function register(registerData) {
        try {
            const response = await axios.post("http://localhost:3000/api/user/register", registerData)
            return response.data
        } catch (err) {
            handleError(
                err.response?.data?.message || "Registration failed"
            );
            throw err;
        }
    }

    async function verifying(token) {
        try {
            const response = await axios.post("http://localhost:3000/api/user/verify", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            handleError(err.response?.data?.message || "Verifying Failed")
            throw err;
        }
    }

    async function login(formData) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/user/login",
                formData
            );
            localStorage.setItem("accessToken", response.data.accessToken);
            setUserData(response.data.user);

            return response.data;

        } catch (err) {
            throw err;
        }
    }

    async function logOut() {
        const accessToken = localStorage.getItem("accessToken");

        try {
            await axios.post("http://localhost:3000/api/user/logout", {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            localStorage.removeItem("accessToken");  // important
            setUserData(null);

        } catch (err) {
            handleError(err.response?.data?.message || "LogOut Failed");
            throw err;
        }
    }

    async function forgotPassword(email) {
        try {
            const response = await axios.post("http://localhost:3000/api/user/forgot-password", { email })
            return response.data;
        } catch (error) {
             handleError(error.response?.data?.message || "Forgot Password Failed");
             throw error
        }
    }

    async function verifyOTP(id, finalOTP) {
        try {
            const response = await axios.post(`http://localhost:3000/api/user/verify-otp/${id}`, {
                otp:finalOTP,
            })

            return response.data
        } catch(err) {
            handleError(err.response?.data?.message || "OTP Verification Failed")
            throw err;
        }
    }

    async function changePassword(id, emailVal, newPassword, confirmPassword) {
        try {
            const response = await axios.post(`http://localhost:3000/api/user/change-password/${id}`, {
                email: emailVal,
                newPassword,
                confirmPassword
            })

            return response.data
        } catch (error) {
            handleError(error.response?.data?.message || "Changing Password Failed")
            throw error
        }
    }
    return (
        <AuthContext.Provider value={{ userData, setUserData, register, verifying, login, logOut, forgotPassword, verifyOTP, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider