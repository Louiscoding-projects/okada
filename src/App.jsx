import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import ProtectedRoute from './components/ProtectedRoute'

import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import PhoneLogin from './pages/PhoneLogin'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import PassengerHome from './pages/PassengerHome'
import RideTracking from './pages/RideTracking'
import RideComplete from './pages/RideComplete'
import RiderDashboard from './pages/RiderDashboard'
import Payment from './pages/Payment'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="antialiased">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/phone" element={<PhoneLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected */}
        <Route path="/home" element={<ProtectedRoute><PassengerHome /></ProtectedRoute>} />
        <Route path="/tracking/:tripId" element={<ProtectedRoute><RideTracking /></ProtectedRoute>} />
        <Route path="/complete/:tripId" element={<ProtectedRoute><RideComplete /></ProtectedRoute>} />
        <Route path="/rider" element={<ProtectedRoute><RiderDashboard /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
