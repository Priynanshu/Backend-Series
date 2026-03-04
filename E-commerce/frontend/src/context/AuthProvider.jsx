import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state zaroori hai

  // 1. PERSIST USER (Page refresh par user wapas lane ke liye)
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile", // Aapke profile route ka sahi path
          { withCredentials: true }
        );
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log("Not logged in");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  // REGISTER
  const registerUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      console.log("Register Error:", err.response?.data || err.message);
      throw err;
    }
  };

  // LOGIN
  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      throw err;
    }
  };

  // LOGOUT
const logoutUser = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/auth/logout", 
      {}, 
      { withCredentials: true }
    );
    
    // 1. Local state clear karo
    setUser(null);
  } catch (err) {
    console.log("Logout Error:", err);
    // Error aaye tab bhi state null kar do safety ke liye
    setUser(null);
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading, 
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {!loading && children} {/* Jab tak check na ho jaye, app render na karein */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;