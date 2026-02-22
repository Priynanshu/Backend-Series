import React, { useState, createContext, useEffect } from 'react'
import axios from "axios"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("User");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // OPTIONAL: extra safety - refresh ke baad sync
    useEffect(() => {
        const savedUser = localStorage.getItem("User");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    async function register(formData) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                formData,
                { withCredentials: true }
            );

            const userData = response.data.user;

            setUser(userData);
            localStorage.setItem("User", JSON.stringify(userData));

            return response.data;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function login(formData) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                formData,
                { withCredentials: true }
            );

            const userData = response.data.user;

            const normalizedUser = {
            ...userData,
            userId: userData._id || userData.userId 
        };

            setUser(normalizedUser);
            localStorage.setItem("User", JSON.stringify(normalizedUser)); 

            return response.data;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function editUser(id, editData) {
    try {
        const response = await axios.put(
            `http://localhost:3000/api/auth/edit/${id}`,
            editData, 
            { 
                withCredentials: true
            }
        );

        const userData = response.data.user;

        if (setUser) {
            setUser(userData);
        }

        localStorage.setItem("User", JSON.stringify(userData));

        return response.data;

    } catch (err) {
        console.error("Edit User Error:", err.response?.data || err.message);
        throw err;
    }
}

    async function logout() {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/logout",
                {},
                { withCredentials: true }
            );

            setUser(null);
            localStorage.removeItem("User");

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout, editUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;