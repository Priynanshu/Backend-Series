import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext  = createContext()
const AuthProvider = ({children}) => {
  const [user, SetUser] = useState(null)

  // Page load par user data restore karo
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const accessToken = localStorage.getItem("accessToken")
    
    if (storedUser && accessToken) {
      SetUser(JSON.parse(storedUser))
    }
  }, [])

  async function register(formData) {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/register", formData)
        SetUser(response.data.user)
        localStorage.setItem("user", JSON.stringify(response.data.user))
      
      return response.data
    }catch(err) {
      console.log(err)
      throw err
    }
  }

  async function login(formData) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      formData
    )

    localStorage.setItem("accessToken", response.data.accessToken)
    SetUser(response.data.user)
    localStorage.setItem("user", JSON.stringify(response.data.user))

    return response.data

  } catch (err) {
    console.log(err.response?.data?.message)
    throw err
  }
}

  return (
    <AuthContext.Provider value={{user, SetUser, register, login}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider