import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SingUp from './pages/SingUp'
import ForgotPassword from './pages/ForgotPassword'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoutes from './pages/ProtectedRoutes'
import VerifyOTP from './pages/VerifyOTP'
import ChangePassword from './pages/ChangePassword'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <ProtectedRoutes><Home /> </ProtectedRoutes>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/verify-otp/:id' element={<VerifyOTP />} />
        <Route path='/change-password/:id' element={<ChangePassword />} />
      </Routes>
    </div>
  )
}

export default App