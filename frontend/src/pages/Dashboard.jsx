
import { useAuth, useUser } from "@clerk/clerk-react"
import { Navigate, Link } from "react-router-dom"
import { motion } from "framer-motion"

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!isSignedIn) return <Navigate to="/" />

  const firstName = user?.firstName || user?.username || "User"

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle background animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i * 0.8), 0],
              y: [0, 100 * Math.cos(i * 0.7), 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-xl opacity-5 ${
              i % 3 === 0
                ? "bg-gradient-to-r from-purple-500 to-pink-500 h-32 w-32"
                : i % 3 === 1
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 h-24 w-24"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 h-28 w-28"
            }`}
            style={{
              left: `${10 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-3">
             Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {firstName}
            </span>
            !
          </h1>
          <p className="text-lg text-gray-400">Ready to explore government schemes with Saathi?</p>
        </motion.div>

        {/* Simple Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">🚀 How to Use Saathi</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Ask in Hindi or English</h3>
                <p className="text-gray-400">Speak or type your questions naturally</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Try examples like:</h3>
                <div className="text-gray-400 text-sm space-y-1">
                  <p>• "Am I eligible for PM Awas Yojana?"</p>
                  <p>• "मुझे कौन सी सरकारी योजना मिल सकती है?"</p>
                  <p>• "What is the age limit for Ayushman Bharat?"</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                3
              </span>
              <div>
                <h3 className="text-lg font-semibold mb-1">Get instant answers</h3>
                <p className="text-gray-400">Receive detailed information about schemes you qualify for</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-teal-400 font-medium">💬 Ready to start? Click the chat icon to begin!</p>
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Chat with Saathi Card */}
          <Link to="/chat">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="h-55 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 cursor-pointer transition-all hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Chat with Saathi</h3>
                <p className="text-gray-400 text-sm">
                  Start a conversation and get instant answers about government schemes
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Explore Schemes Card */}
          <Link to="/explore">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="h-55 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 cursor-pointer transition-all hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Explore Schemes</h3>
                <p className="text-gray-400 text-sm">Browse through various government schemes and their details</p>
              </div>
            </motion.div>
          </Link>

          {/* Check Eligibility Card */}
          <Link to="/eligibility">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="h-55 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 cursor-pointer transition-all hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check Eligibility</h3>
                <p className="text-gray-400 text-sm">Find out which schemes you qualify for based on your profile</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
        {/* Space for your additional content */}
      </div>
    </div>
  )
}

export default Dashboard
