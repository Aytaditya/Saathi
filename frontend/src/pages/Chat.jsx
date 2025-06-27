"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Mic,
  MicOff,
  ArrowLeft,
  Loader2,
  Sparkles,
  MessageSquare,
  Volume2,
  VolumeX,
  Brain,
  Network,
} from "lucide-react"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Player } from "@lottiefiles/react-lottie-player"
import ForceGraph2D from "react-force-graph-2d"

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Saathi, your AI assistant for government schemes. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [recognition, setRecognition] = useState(null)
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [activeNodes, setActiveNodes] = useState(new Set())
  const [ragProcess, setRagProcess] = useState({ stage: "idle", description: "Ready" })
  const [animationInterval, setAnimationInterval] = useState(null)

  const messagesEndRef = useRef(null)
  const synthRef = useRef(null)
  const lottieRef = useRef()
  const forceRef = useRef()

  const quickQuestions = [
    "What are benefits of Pradhan Mantri Jan Arogya Yojana",
    "मुझे कौन सी सरकारी योजना मिल सकती है?",
    "Tell me about PM Awas Yojana eligibility",
    "Tell me about Pradhan Mantri Awas Yojana",
    "What is Pradhan Mantri Kisan Samman Nidhi?",
    "What is eligibility criteria for Pradhan Mantri Awas Yojana and its benefits?",
  ]

  // Initialize the brain-like graph structure
  const initializeGraph = useCallback(() => {
    const nodes = [
      // Central AI Brain Node
      { id: "ai-brain", name: "AI Brain", group: "brain", size: 20, color: "#8b5cf6" },

      // Query Processing Layer
      { id: "query-processor", name: "Query Processor", group: "processing", size: 15, color: "#06b6d4" },
      { id: "intent-analyzer", name: "Intent Analyzer", group: "processing", size: 12, color: "#06b6d4" },
      { id: "language-detector", name: "Language Detector", group: "processing", size: 10, color: "#06b6d4" },

      // Knowledge Base Nodes
      { id: "schemes-db", name: "Government Schemes DB", group: "knowledge", size: 14, color: "#10b981" },
      { id: "eligibility-db", name: "Eligibility Criteria", group: "knowledge", size: 12, color: "#10b981" },
      { id: "benefits-db", name: "Benefits Database", group: "knowledge", size: 12, color: "#10b981" },
      { id: "documents-db", name: "Documents Required", group: "knowledge", size: 10, color: "#10b981" },
      { id: "application-db", name: "Application Process", group: "knowledge", size: 10, color: "#10b981" },

      // Retrieval Layer
      { id: "vector-search", name: "Vector Search", group: "retrieval", size: 13, color: "#f59e0b" },
      { id: "semantic-match", name: "Semantic Matching", group: "retrieval", size: 11, color: "#f59e0b" },
      { id: "relevance-scorer", name: "Relevance Scorer", group: "retrieval", size: 10, color: "#f59e0b" },

      // Generation Layer
      { id: "context-builder", name: "Context Builder", group: "generation", size: 12, color: "#ef4444" },
      { id: "response-generator", name: "Response Generator", group: "generation", size: 14, color: "#ef4444" },
      { id: "fact-checker", name: "Fact Checker", group: "generation", size: 10, color: "#ef4444" },

      // Output Layer
      { id: "response-formatter", name: "Response Formatter", group: "output", size: 11, color: "#ec4899" },
      { id: "speech-synthesizer", name: "Speech Synthesizer", group: "output", size: 9, color: "#ec4899" },
    ]

    const links = [
      // Query flow
      { source: "query-processor", target: "ai-brain", strength: 2 },
      { source: "intent-analyzer", target: "query-processor", strength: 1.5 },
      { source: "language-detector", target: "query-processor", strength: 1.5 },

      // Knowledge connections
      { source: "ai-brain", target: "schemes-db", strength: 2 },
      { source: "ai-brain", target: "eligibility-db", strength: 1.8 },
      { source: "ai-brain", target: "benefits-db", strength: 1.8 },
      { source: "schemes-db", target: "documents-db", strength: 1.2 },
      { source: "schemes-db", target: "application-db", strength: 1.2 },

      // Retrieval connections
      { source: "ai-brain", target: "vector-search", strength: 2 },
      { source: "vector-search", target: "semantic-match", strength: 1.5 },
      { source: "semantic-match", target: "relevance-scorer", strength: 1.3 },

      // Generation flow
      { source: "ai-brain", target: "context-builder", strength: 1.8 },
      { source: "context-builder", target: "response-generator", strength: 2 },
      { source: "response-generator", target: "fact-checker", strength: 1.4 },

      // Output connections
      { source: "response-generator", target: "response-formatter", strength: 1.6 },
      { source: "response-formatter", target: "speech-synthesizer", strength: 1.2 },

      // Cross-layer connections
      { source: "vector-search", target: "schemes-db", strength: 1.5 },
      { source: "vector-search", target: "eligibility-db", strength: 1.3 },
      { source: "vector-search", target: "benefits-db", strength: 1.3 },
      { source: "relevance-scorer", target: "context-builder", strength: 1.4 },
    ]

    setGraphData({ nodes, links })
  }, [])

  // Simulate RAG process visualization
  const simulateRAGProcess = useCallback(() => {
    const stages = [
      {
        stage: "processing",
        nodes: ["query-processor", "intent-analyzer", "language-detector"],
        delay: 2000,
        description: "Processing Query",
      },
      {
        stage: "retrieval",
        nodes: ["ai-brain", "vector-search", "semantic-match", "schemes-db", "eligibility-db", "benefits-db"],
        delay: 2500,
        description: "Retrieving Knowledge",
      },
      {
        stage: "scoring",
        nodes: ["relevance-scorer", "ai-brain", "vector-search"],
        delay: 1800,
        description: "Scoring Relevance",
      },
      {
        stage: "generation",
        nodes: ["context-builder", "response-generator", "fact-checker", "ai-brain"],
        delay: 2200,
        description: "Generating Response",
      },
      {
        stage: "output",
        nodes: ["response-formatter", "speech-synthesizer"],
        delay: 1500,
        description: "Formatting Output",
      },
    ]

    const currentStageIndex = 0
    const animationTimeouts = []

    const runStage = (stageIndex) => {
      if (!isLoading || stageIndex >= stages.length) {
        // If not loading anymore or we've completed all stages, reset
        if (!isLoading) {
          setActiveNodes(new Set())
          setRagProcess({ stage: "idle", description: "Ready" })
        }
        return
      }

      const currentStage = stages[stageIndex]

      // Activate current stage nodes
      setActiveNodes(new Set([...currentStage.nodes, "ai-brain"]))
      setRagProcess({
        stage: currentStage.stage,
        description: currentStage.description,
      })

      // Schedule next stage
      const timeout = setTimeout(() => {
        const nextIndex = (stageIndex + 1) % stages.length

        // If we've completed all stages and still loading, restart from beginning
        if (stageIndex === stages.length - 1 && isLoading) {
          // Add a small pause before restarting
          const restartTimeout = setTimeout(() => {
            if (isLoading) {
              runStage(0)
            }
          }, 1000)
          animationTimeouts.push(restartTimeout)
        } else {
          runStage(nextIndex)
        }
      }, currentStage.delay)

      animationTimeouts.push(timeout)
    }

    // Clear any existing timeouts
    if (animationInterval) {
      animationInterval.forEach((timeout) => clearTimeout(timeout))
    }
    setAnimationInterval(animationTimeouts)

    // Start the animation
    runStage(0)

    // Cleanup function
    return () => {
      animationTimeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [isLoading, animationInterval])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"
      recognitionInstance.onstart = () => setIsListening(true)
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }
      recognitionInstance.onend = () => setIsListening(false)
      setRecognition(recognitionInstance)
    }

    // Initialize Speech Synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    // Initialize graph
    initializeGraph()

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [initializeGraph])

  // Start RAG animation when loading starts, stop when loading ends
  useEffect(() => {
    if (isLoading) {
      const cleanup = simulateRAGProcess()
      return cleanup
    } else {
      // Clear animation when loading stops
      if (animationInterval) {
        animationInterval.forEach((timeout) => clearTimeout(timeout))
        setAnimationInterval(null)
      }
      // Reset to idle state
      setTimeout(() => {
        setActiveNodes(new Set())
        setRagProcess({ stage: "idle", description: "Ready" })
      }, 500)
    }
  }, [isLoading])

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isSpeaking) {
      lottieRef.current?.play()
    } else {
      lottieRef.current?.stop()
    }
  }, [isSpeaking])

  // Text-to-Speech function
  const speakText = (text) => {
    if (!speechEnabled || !synthRef.current) return

    if (synthRef.current.speaking) {
      synthRef.current.cancel()
    }

    const cleanText = text.replace(/[#*`]/g, "").replace(/\n+/g, ". ").replace(/\s+/g, " ").trim()

    if (cleanText) {
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      const voices = synthRef.current.getVoices()
      const preferredVoice =
        voices.find(
          (voice) =>
            voice.lang.startsWith("en") &&
            (voice.name.includes("Google") || voice.name.includes("Microsoft") || voice.name.includes("Natural")),
        ) || voices.find((voice) => voice.lang.startsWith("en"))

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
    }
  }

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled)
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return

    // Stop any ongoing speech
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    const loadingMessage = {
      id: messages.length + 2,
      text: "Thinking...",
      isBot: true,
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, loadingMessage])

    try {
      const response = await fetch(`http://localhost:8000/chat?question=${encodeURIComponent(messageText)}`)
      const data = await response.json()
      const botResponse = data.answer || "I'm sorry, I couldn't process your request right now."

      setMessages((prev) => {
        const withoutLoading = prev.filter((msg) => !msg.isLoading)
        return [
          ...withoutLoading,
          {
            id: prev.length + 1,
            text: botResponse,
            isBot: true,
            timestamp: new Date(),
          },
        ]
      })

      setTimeout(() => speakText(botResponse), 500)
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = "I'm sorry, there was an error processing your request. Please try again."
      setMessages((prev) => {
        const withoutLoading = prev.filter((msg) => !msg.isLoading)
        return [
          ...withoutLoading,
          {
            id: prev.length + 1,
            text: errorMessage,
            isBot: true,
            timestamp: new Date(),
          },
        ]
      })
      setTimeout(() => speakText(errorMessage), 500)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = () => {
    sendMessage(inputText)
  }

  const handleQuickQuestion = (question) => {
    sendMessage(question)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (inputText.trim().length > 5 && !isListening && inputText !== "") {
      const timer = setTimeout(() => {
        if (inputText.trim()) {
          handleSendMessage()
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [inputText, isListening])

  // Custom markdown components
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">{children}</h1>
    ),
    h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold text-gray-200 mb-2 mt-3">{children}</h3>,
    p: ({ children }) => <p className="text-gray-100 mb-3 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside text-gray-100 mb-3 space-y-1 ml-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-100 mb-3 space-y-1 ml-4">{children}</ol>,
    li: ({ children }) => <li className="text-gray-100">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children, inline }) =>
      inline ? (
        <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">{children}</code>
      ) : (
        <pre className="bg-gray-800 border border-gray-700 rounded-lg p-4 overflow-x-auto mb-3">
          <code className="text-gray-200 text-sm font-mono">{children}</code>
        </pre>
      ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 py-2 bg-gray-800/50 rounded-r-lg mb-3 italic text-gray-200">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline transition-colors"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-3">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
    tbody: ({ children }) => <tbody className="bg-gray-900/50">{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-gray-700">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-2 text-left text-white font-semibold">{children}</th>,
    td: ({ children }) => <td className="px-4 py-2 text-gray-200">{children}</td>,
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
      {/* Enhanced background animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 150 * Math.sin(i * 0.8), -100 * Math.cos(i * 0.6), 0],
              y: [0, 120 * Math.cos(i * 0.7), 180 * Math.sin(i * 0.9), 0],
              scale: [1, 1.3, 0.9, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-2xl ${
              i % 4 === 0
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 h-40 w-40"
                : i % 4 === 1
                  ? "bg-gradient-to-r from-blue-500/15 to-cyan-500/15 h-32 w-32"
                  : i % 4 === 2
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 h-36 w-36"
                    : "bg-gradient-to-r from-orange-500/15 to-red-500/15 h-28 w-28"
            }`}
            style={{
              left: `${(i * 8) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              x: [0, 80 * Math.sin(i * 0.5), -40 * Math.cos(i * 0.3)],
              y: [0, -150, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 12 + i * 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className={`absolute h-1.5 w-1.5 rounded-full ${
              i % 5 === 0
                ? "bg-purple-400/60"
                : i % 5 === 1
                  ? "bg-blue-400/60"
                  : i % 5 === 2
                    ? "bg-green-400/60"
                    : i % 5 === 3
                      ? "bg-pink-400/60"
                      : "bg-cyan-400/60"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Chat Section - Left Side */}
      <div className="w-3/5 flex flex-col relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl flex-shrink-0"
        >
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700/50 hover:border-gray-600/50"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                  </motion.button>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Chat with Saathi
                    </h1>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI-Powered Government Scheme Assistant
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSpeech}
                  className={`p-3 backdrop-blur-sm rounded-xl transition-all border ${
                    speechEnabled
                      ? "bg-green-500/20 border-green-500/50 text-green-400"
                      : "bg-gray-800/50 border-gray-700/50 text-gray-400"
                  }`}
                >
                  {speechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </motion.button>
                <div className="hidden md:flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50">
                  <div
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      isSpeaking ? "bg-blue-400" : isListening ? "bg-red-400" : "bg-green-400"
                    }`}
                  />
                  <span className="text-gray-300 text-sm">
                    {isSpeaking ? "Speaking" : isListening ? "Listening" : "Online"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Quick Questions */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 flex-shrink-0"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">🚀 Quick Start</h2>
                <p className="text-gray-400 text-sm">Choose a question below, type, or speak your query</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {quickQuestions.slice(0, 4).map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="group text-left p-4 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-purple-500/30 hover:bg-gray-800/40 transition-all duration-300"
                    disabled={isLoading}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                        <MessageSquare className="w-3 h-3 text-purple-400" />
                      </div>
                      <p className="text-gray-200 text-xs leading-relaxed group-hover:text-white transition-colors">
                        {question}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-4`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[85%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`flex-shrink-0 relative ${message.isBot ? "" : "order-2"}`}>
                        {message.isBot ? (
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            {isSpeaking && index === messages.length - 1 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute -top-1 -right-1 w-12 h-12 pointer-events-none"
                              >
                                <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
                                  <Player
                                    ref={lottieRef}
                                    autoplay
                                    loop
                                    src="/speaking.json"
                                    style={{ width: "24px", height: "24px" }}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-semibold text-xs">You</span>
                          </div>
                        )}
                      </div>

                      <div className={`flex flex-col ${message.isBot ? "" : "items-end"}`}>
                        <div
                          className={`relative px-4 py-3 rounded-2xl shadow-lg ${
                            message.isBot
                              ? "bg-gray-900/60 backdrop-blur-sm text-gray-100 border border-gray-800/50 rounded-tl-sm"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm shadow-purple-500/25"
                          }`}
                        >
                          {message.isLoading ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                              <div className="flex gap-1">
                                {[0, 0.2, 0.4].map((delay, i) => (
                                  <motion.div
                                    key={i}
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay }}
                                    className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                                  />
                                ))}
                              </div>
                            </div>
                          ) : message.isBot ? (
                            <div className="prose prose-sm max-w-none">
                              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                          )}
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 px-2 ${message.isBot ? "text-left" : "text-right"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border-t border-gray-800/50 p-4 flex-shrink-0"
          >
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? "Listening..." : "Ask about government schemes..."}
                    className={`w-full bg-gray-900/50 backdrop-blur-sm border rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                      isListening
                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                        : "border-gray-700/50 focus:ring-purple-500/50 focus:border-purple-500/50"
                    }`}
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={isListening ? stopListening : startListening}
                      className={`p-1.5 backdrop-blur-sm border rounded-lg transition-all ${
                        isListening
                          ? "bg-red-500/20 border-red-500/50 text-red-400"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                      disabled={isLoading || !recognition}
                    >
                      {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </motion.button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-500">
                {isListening ? "🎤 Listening..." : "Ask in Hindi or English • Press Enter to send"}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isSpeaking ? "bg-blue-400" : isListening ? "bg-red-400" : "bg-green-400"
                  }`}
                />
                {isSpeaking ? "AI Speaking" : isListening ? "Voice Input" : "Powered by AI"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RAG Visualization - Right Side */}
      <div className="w-2/5 border-l border-gray-800/50 bg-black/20 backdrop-blur-sm relative z-20 flex flex-col">
        {/* Visualization Header */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-gray-800/50 p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">RAG Process Visualization</h2>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Network className="w-3 h-3" />
                Real-time AI Knowledge Retrieval
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">Brain</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-gray-400">Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">Knowledge</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-400">Retrieval</span>
            </div>
          </div>
        </div>

        {/* Force Graph */}
        <div className="flex-1 relative">
          <ForceGraph2D
            key={`${activeNodes.size}-${ragProcess.stage}-${Date.now()}`}
            ref={forceRef}
            graphData={graphData}
            width={window.innerWidth * 0.4}
            height={window.innerHeight - 200}
            backgroundColor="transparent"
            nodeLabel="name"
            nodeColor={(node) => {
              if (activeNodes.has(node.id)) {
                return "#ffffff"
              }
              return node.color
            }}
            nodeVal={(node) => {
              if (activeNodes.has(node.id)) {
                return node.size * 1.5
              }
              return node.size
            }}
            linkColor={() => "#374151"}
            linkWidth={(link) => {
              const sourceActive = activeNodes.has(link.source.id || link.source)
              const targetActive = activeNodes.has(link.target.id || link.target)
              return sourceActive || targetActive ? 3 : 1
            }}
            linkOpacity={(link) => {
              const sourceActive = activeNodes.has(link.source.id || link.source)
              const targetActive = activeNodes.has(link.target.id || link.target)
              return sourceActive || targetActive ? 0.8 : 0.3
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name
              const fontSize = Math.max(10, 12 / globalScale)
              const isActive = activeNodes.has(node.id)

              ctx.font = `${fontSize}px Sans-Serif`

              // Draw glow effect for active nodes first
              if (isActive) {
                ctx.shadowColor = node.color
                ctx.shadowBlur = 25
                ctx.globalAlpha = 0.8
                ctx.beginPath()
                ctx.arc(node.x, node.y, node.size / 2 + 5, 0, 2 * Math.PI, false)
                ctx.fillStyle = node.color
                ctx.fill()
                ctx.shadowBlur = 0
                ctx.globalAlpha = 1
              }

              // Draw main node
              ctx.beginPath()
              ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI, false)
              ctx.fillStyle = isActive ? "#ffffff" : node.color
              ctx.fill()

              // Add pulsing border for active nodes
              if (isActive) {
                ctx.strokeStyle = node.color
                ctx.lineWidth = 3
                ctx.stroke()
              }

              // Draw label
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillStyle = isActive ? "#ffffff" : "#d1d5db"
              ctx.font = `${isActive ? "bold " : ""}${fontSize}px Sans-Serif`
              ctx.fillText(label, node.x, node.y + node.size / 2 + fontSize + 4)
            }}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.08}
            cooldownTicks={100}
            onEngineStop={() => forceRef.current?.zoomToFit(400)}
          />

          {/* Status Overlay */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-2 h-2 rounded-full ${ragProcess.stage === "idle" ? "bg-gray-500" : "bg-green-400 animate-pulse"}`}
              ></div>
              <span className="text-white text-sm font-medium">{ragProcess.description}</span>
            </div>
            <p className="text-gray-400 text-xs">
              {ragProcess.stage === "idle"
                ? "Ask a question to see the RAG process in action"
                : "Watch the knowledge retrieval process"}
            </p>
            {ragProcess.stage !== "idle" && (
              <div className="mt-2 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    className="w-1 h-1 bg-green-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
