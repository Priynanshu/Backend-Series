import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Hero = () => {
  const {userData} = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-200 text-sm font-medium backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-300">
              ✨ {`Welcome to Our Platform ${userData?.name}`}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-blue-300">
              Secure Authentication
            </span>
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-purple-300 mt-2">
              Made Simple
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience seamless, secure authentication with our modern platform. Fast verification, email confirmation, and password recovery all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <button className="group relative px-8 py-4 border-2 border-purple-400 text-purple-200 font-semibold rounded-lg hover:border-purple-300 hover:text-white transition-all duration-300 backdrop-blur-sm bg-purple-500/10 hover:bg-purple-500/20">
              <span className="flex items-center justify-center gap-2">
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            {/* Feature 1 */}
            <div className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">High Security</h3>
              <p className="text-gray-400 text-sm">Bank-level encryption to keep your data safe</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Instant verification and authentication</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-pink-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-r from-pink-600 to-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Easy to Use</h3>
              <p className="text-gray-400 text-sm">Simple and intuitive user interface</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom linear overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent pointer-events-none"></div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Hero