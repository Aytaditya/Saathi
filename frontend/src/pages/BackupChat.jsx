// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Send, Mic, ArrowLeft, Loader2, Sparkles, MessageSquare } from "lucide-react"
// import { Link } from "react-router-dom"
// import ReactMarkdown from "react-markdown"
// import remarkGfm from "remark-gfm"

// const BackupChat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Saathi, your AI assistant for government schemes. How can I help you today?",
//       isBot: true,
//       timestamp: new Date(),
//     },
//   ])
//   const [inputText, setInputText] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef(null)

//   const quickQuestions = [
//     "What are benefits of Pradhan Mantri Jan Arogya Yojana",
//     "मुझे कौन सी सरकारी योजना मिल सकती है?",
//     "Tell me about PM Awas Yojana eligibility",
//     "Tell me about Pradhan Mantri Awas Yojana",
//     "What is Pradhan Mantri Kisan Samman Nidhi?",
//     "What is eligibility criteria for Pradhan Mantri Awas Yojana and its benefits?",
//   ]

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const sendMessage = async (messageText) => {
//     if (!messageText.trim() || isLoading) return

//     const userMessage = {
//       id: messages.length + 1,
//       text: messageText,
//       isBot: false,
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInputText("")
//     setIsLoading(true)

//     // Add loading message
//     const loadingMessage = {
//       id: messages.length + 2,
//       text: "Thinking...",
//       isBot: true,
//       timestamp: new Date(),
//       isLoading: true,
//     }
//     setMessages((prev) => [...prev, loadingMessage])

//     try {
//       const response = await fetch(`http://localhost:8000/chat?question=${encodeURIComponent(messageText)}`)
//       const data = await response.json()

//       // Remove loading message and add actual response
//       setMessages((prev) => {
//         const withoutLoading = prev.filter((msg) => !msg.isLoading)
//         return [
//           ...withoutLoading,
//           {
//             id: prev.length + 1,
//             text: data.answer || "I'm sorry, I couldn't process your request right now.",
//             isBot: true,
//             timestamp: new Date(),
//           },
//         ]
//       })
//     } catch (error) {
//       console.error("Error:", error)
//       setMessages((prev) => {
//         const withoutLoading = prev.filter((msg) => !msg.isLoading)
//         return [
//           ...withoutLoading,
//           {
//             id: prev.length + 1,
//             text: "I'm sorry, there was an error processing your request. Please try again.",
//             isBot: true,
//             timestamp: new Date(),
//           },
//         ]
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSendMessage = () => {
//     sendMessage(inputText)
//   }

//   const handleQuickQuestion = (question) => {
//     sendMessage(question)
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   // Custom markdown components for better styling
//   const markdownComponents = {
//     h1: ({ children }) => (
//       <h1 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">{children}</h1>
//     ),
//     h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h2>,
//     h3: ({ children }) => <h3 className="text-base font-semibold text-gray-200 mb-2 mt-3">{children}</h3>,
//     p: ({ children }) => <p className="text-gray-100 mb-3 leading-relaxed">{children}</p>,
//     ul: ({ children }) => <ul className="list-disc list-inside text-gray-100 mb-3 space-y-1 ml-4">{children}</ul>,
//     ol: ({ children }) => <ol className="list-decimal list-inside text-gray-100 mb-3 space-y-1 ml-4">{children}</ol>,
//     li: ({ children }) => <li className="text-gray-100">{children}</li>,
//     strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
//     em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
//     code: ({ children, inline }) =>
//       inline ? (
//         <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">{children}</code>
//       ) : (
//         <pre className="bg-gray-800 border border-gray-700 rounded-lg p-4 overflow-x-auto mb-3">
//           <code className="text-gray-200 text-sm font-mono">{children}</code>
//         </pre>
//       ),
//     blockquote: ({ children }) => (
//       <blockquote className="border-l-4 border-purple-500 pl-4 py-2 bg-gray-800/50 rounded-r-lg mb-3 italic text-gray-200">
//         {children}
//       </blockquote>
//     ),
//     a: ({ href, children }) => (
//       <a
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-purple-400 hover:text-purple-300 underline transition-colors"
//       >
//         {children}
//       </a>
//     ),
//     table: ({ children }) => (
//       <div className="overflow-x-auto mb-3">
//         <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">{children}</table>
//       </div>
//     ),
//     thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
//     tbody: ({ children }) => <tbody className="bg-gray-900/50">{children}</tbody>,
//     tr: ({ children }) => <tr className="border-b border-gray-700">{children}</tr>,
//     th: ({ children }) => <th className="px-4 py-2 text-left text-white font-semibold">{children}</th>,
//     td: ({ children }) => <td className="px-4 py-2 text-gray-200">{children}</td>,
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
//       {/* Enhanced background animations */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               x: [0, 150 * Math.sin(i * 0.8), -100 * Math.cos(i * 0.6), 0],
//               y: [0, 120 * Math.cos(i * 0.7), 180 * Math.sin(i * 0.9), 0],
//               scale: [1, 1.3, 0.9, 1],
//               rotate: [0, 180, 360],
//             }}
//             transition={{
//               duration: 20 + i * 3,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//             className={`absolute rounded-full blur-2xl ${
//               i % 4 === 0
//                 ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 h-40 w-40"
//                 : i % 4 === 1
//                   ? "bg-gradient-to-r from-blue-500/15 to-cyan-500/15 h-32 w-32"
//                   : i % 4 === 2
//                     ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 h-36 w-36"
//                     : "bg-gradient-to-r from-orange-500/15 to-red-500/15 h-28 w-28"
//             }`}
//             style={{
//               left: `${5 + i * 15}%`,
//               top: `${10 + i * 12}%`,
//             }}
//           />
//         ))}

//         {/* Floating particles */}
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={`particle-${i}`}
//             animate={{
//               x: [0, 80 * Math.sin(i * 0.5), -40 * Math.cos(i * 0.3)],
//               y: [0, -150, 0],
//               opacity: [0.2, 0.6, 0.2],
//             }}
//             transition={{
//               duration: 12 + i * 0.8,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//               delay: i * 0.3,
//             }}
//             className={`absolute h-1.5 w-1.5 rounded-full ${
//               i % 5 === 0
//                 ? "bg-purple-400/60"
//                 : i % 5 === 1
//                   ? "bg-blue-400/60"
//                   : i % 5 === 2
//                     ? "bg-green-400/60"
//                     : i % 5 === 3
//                       ? "bg-pink-400/60"
//                       : "bg-cyan-400/60"
//             }`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Modern Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl"
//       >
//         <div className="max-w-6xl mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <Link to="/dashboard">
//                 <motion.button
//                   whileHover={{ scale: 1.05, x: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700/50 hover:border-gray-600/50"
//                 >
//                   <ArrowLeft className="w-5 h-5 text-gray-300" />
//                 </motion.button>
//               </Link>

//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
//                     <MessageSquare className="w-7 h-7 text-white" />
//                   </div>
//                   <motion.div
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                     className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"
//                   />
//                 </div>

//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                     Chat with Saathi
//                   </h1>
//                   <p className="text-gray-400 text-sm flex items-center gap-2">
//                     <Sparkles className="w-4 h-4" />
//                     AI-Powered Government Scheme Assistant
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="hidden md:flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//               <span className="text-gray-300 text-sm">Online</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       <div className="relative z-10 max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col">
//         {/* Quick Questions - Show when conversation is fresh */}
//         {messages.length === 1 && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="p-8"
//           >
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-white mb-3">🚀 Quick Start</h2>
//               <p className="text-gray-400">Choose a question below or type your own</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {quickQuestions.map((question, index) => (
//                 <motion.button
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index }}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => handleQuickQuestion(question)}
//                   className="group text-left p-5 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl hover:border-purple-500/30 hover:bg-gray-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
//                   disabled={isLoading}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
//                       <MessageSquare className="w-4 h-4 text-purple-400" />
//                     </div>
//                     <p className="text-gray-200 text-sm leading-relaxed group-hover:text-white transition-colors">
//                       {question}
//                     </p>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Messages Area */}
//         <div className="flex-1 overflow-y-auto px-8 py-6">
//           <div className="space-y-6">
//             <AnimatePresence>
//               {messages.map((message, index) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -20, scale: 0.95 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-6`}
//                 >
//                   <div
//                     className={`flex items-start gap-3 max-w-[85%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}
//                   >
//                     {/* Avatar */}
//                     <div className={`flex-shrink-0 ${message.isBot ? "" : "order-2"}`}>
//                       {message.isBot ? (
//                         <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
//                           <Sparkles className="w-5 h-5 text-white" />
//                         </div>
//                       ) : (
//                         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
//                           <span className="text-white font-semibold text-sm">You</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Message Bubble */}
//                     <div className={`flex flex-col ${message.isBot ? "" : "items-end"}`}>
//                       <div
//                         className={`relative px-6 py-4 rounded-2xl shadow-lg ${
//                           message.isBot
//                             ? "bg-gray-900/60 backdrop-blur-sm text-gray-100 border border-gray-800/50 rounded-tl-sm"
//                             : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm shadow-purple-500/25"
//                         }`}
//                       >
//                         {message.isLoading ? (
//                           <div className="flex items-center gap-3">
//                             <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
//                             <div className="flex gap-1">
//                               <motion.div
//                                 animate={{ opacity: [0.4, 1, 0.4] }}
//                                 transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
//                                 className="w-2 h-2 bg-purple-400 rounded-full"
//                               />
//                               <motion.div
//                                 animate={{ opacity: [0.4, 1, 0.4] }}
//                                 transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
//                                 className="w-2 h-2 bg-purple-400 rounded-full"
//                               />
//                               <motion.div
//                                 animate={{ opacity: [0.4, 1, 0.4] }}
//                                 transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
//                                 className="w-2 h-2 bg-purple-400 rounded-full"
//                               />
//                             </div>
//                           </div>
//                         ) : message.isBot ? (
//                           <div className="prose prose-sm max-w-none">
//                             <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
//                               {message.text}
//                             </ReactMarkdown>
//                           </div>
//                         ) : (
//                           <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
//                         )}
//                       </div>

//                       <p className={`text-xs text-gray-500 mt-2 px-2 ${message.isBot ? "text-left" : "text-right"}`}>
//                         {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Enhanced Input Area */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-black/40 backdrop-blur-xl border-t border-gray-800/50 p-6"
//         >
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-end gap-4">
//               <div className="flex-1 relative">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Ask about government schemes..."
//                     className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-4 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm"
//                     disabled={isLoading}
//                   />
//                   <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
//                       disabled={isLoading}
//                     >
//                       <Mic className="w-4 h-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSendMessage}
//                 disabled={!inputText.trim() || isLoading}
//                 className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
//               >
//                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//               </motion.button>
//             </div>

//             <div className="flex items-center justify-between mt-4">
//               <p className="text-xs text-gray-500">Ask in Hindi or English • Press Enter to send</p>
//               <div className="flex items-center gap-2 text-xs text-gray-500">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                 Powered by AI
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default BackupChat