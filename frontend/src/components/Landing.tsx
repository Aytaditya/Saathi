import { ArrowRight, Mic, FileText, Shield, Globe, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import Footer from "./Footer"



export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Colorful animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Gradient orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            animate={{
              x: [0, 200 * Math.sin(i * 0.8), -100 * Math.cos(i * 0.6), 0],
              y: [0, 150 * Math.cos(i * 0.7), 200 * Math.sin(i * 0.9), 0],
              scale: [1, 1.5, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-xl opacity-10 ${i % 4 === 0
              ? "bg-gradient-to-r from-purple-500 to-pink-500 h-32 w-32"
              : i % 4 === 1
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 h-24 w-24"
                : i % 4 === 2
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 h-28 w-28"
                  : "bg-gradient-to-r from-orange-500 to-red-500 h-20 w-20"
              }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 11}%`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              x: [0, 100 * Math.sin(i * 0.5), -50 * Math.cos(i * 0.3)],
              y: [0, -200, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className={`absolute h-1 w-1 rounded-full ${i % 6 === 0
              ? "bg-purple-400"
              : i % 6 === 1
                ? "bg-blue-400"
                : i % 6 === 2
                  ? "bg-green-400"
                  : i % 6 === 3
                    ? "bg-pink-400"
                    : i % 6 === 4
                      ? "bg-cyan-400"
                      : "bg-orange-400"
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Animated gradient waves */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-5"
          style={{
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      <main className="relative text-center pt-32 px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight drop-shadow-2xl relative">
            Government{" "}
            <span className="relative inline-block text-white">
              Schemes
              {/* Bouncing Ball */}
              <motion.div
                animate={{
                  y: [-25, -2, -25],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg shadow-pink-400/60"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))',
                }}
              />
              {/* Impact ripple effect */}
              <motion.div
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-gradient-to-r from-pink-400/50 to-purple-400/50 rounded-full blur-sm"
              />
            </span>
            <br />
            Through{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Natural</span>{" "}
            Conversation
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Check eligibility for Indian government schemes using voice or chat in Hindi or English with AI-powered
            responses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#start"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25"
            >
              Start Chatting <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full text-lg font-medium border-2 border-cyan-500 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all shadow-lg shadow-cyan-500/25"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-24 mx-auto max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="p-1 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="bg-black p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6 text-left">
                  <h3 className="text-2xl font-bold text-white">Sample Interaction</h3>
                  <div className="space-y-4">
                    {[
                      "What farming schemes exist for small landowners?",
                      "मैं एक विधवा हूँ, मेरे लिए कौन सी योजनाएँ हैं?",
                      "Show education scholarships for SC students",
                    ].map((question, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer border-l-2 border-white"
                      >
                        <p className="text-gray-200">{question}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <div className="bg-gray-900 px-4 py-3 flex items-center border-b border-gray-800">
                      <div className="flex space-x-2 mr-4">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-gray-500">response.json</div>
                    </div>
                    <div className="h-64 bg-black p-4 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="bg-gray-900 rounded p-3 max-w-[80%]">
                          <p className="text-gray-300 text-sm">Eligible schemes for small farmers:</p>
                        </div>
                        <div className="bg-white/10 rounded p-3 max-w-[80%] ml-auto">
                          <p className="text-gray-100 text-sm">
                            1. PM Kisan Samman Nidhi
                            <br />
                            2. Kisan Credit Card
                            <br />
                            3. PM Fasal Bima Yojana
                          </p>
                        </div>
                        <div className="bg-gray-900 rounded p-3 max-w-[80%]">
                          <p className="text-gray-300 text-sm">Need details on any specific scheme?</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900 border-t border-gray-800">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ask a question..."
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white"
                        />
                        <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                          <Mic className="w-5 h-5 text-gray-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <section id="features" className="relative mt-40 px-8 py-24 bg-black z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-semibold tracking-wider text-gray-500 mb-2 inline-block">FEATURES</span>
            <h3 className="text-4xl font-bold text-white">Key Capabilities</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-8 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-24 px-8 bg-black z-10 border-t border-b border-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-semibold tracking-wider text-gray-500 mb-2 inline-block">PROCESS</span>
            <h3 className="text-4xl font-bold text-white">How It Works</h3>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 -ml-px opacity-50"></div>

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`mb-16 flex flex-col lg:flex-row items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="text-white text-2xl mb-3">{step.emoji}</div>
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </motion.div>
                </div>
                <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:pl-12" : "lg:pr-12"} mt-8 lg:mt-0`}>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-black px-4 py-2.5 flex items-center border-b border-gray-800">
                      <div className="flex space-x-1.5 mr-3">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-gray-500 font-mono">{step.exampleTitle}</div>
                    </div>
                    <div className="p-4">
                      <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap">{step.example}</pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-24 px-8 bg-black z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-wider text-gray-500 mb-2 inline-block">SUPPORT</span>
            <h3 className="text-4xl font-bold text-white">Frequently Asked Questions</h3>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border-b border-gray-900"
              >
                <details className="group">
                  <summary className="list-none flex justify-between items-center py-5 cursor-pointer hover:bg-gray-900/30 px-4 rounded-lg transition-colors">
                    <h4 className="text-lg font-medium text-white">{faq.question}</h4>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pb-5 px-4 text-gray-400 text-sm">{faq.answer}</div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

const features = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Bilingual Interface",
    description: "Speak or type in Hindi or English with seamless language switching.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Document-Based Answers",
    description: "Responses sourced directly from official government PDFs you provide.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Voice & Text Output",
    description: "Get answers as spoken audio or written text based on your preference.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        ></path>
      </svg>
    ),
    title: "Eligibility Matching",
    description: "Automatically identifies schemes matching your profile criteria.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    ),
    title: "Live Web Search",
    description: "Fetches latest information from official sources when needed.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy Focused",
    description: "No personal data storage. All processing happens in your browser.",
  },
]

const steps = [
  {
    emoji: "📄",
    title: "Upload Documents",
    description: "Provide PDFs of government scheme documents for the AI to reference.",
    exampleTitle: "schemes.pdf",
    example: `PM-KISAN Guidelines\n\nEligibility:\n- Small farmers\n- Landholding ≤2ha\n\nBenefits:\n₹6000/year in 3 installments`,
  },
  {
    emoji: "💬",
    title: "Ask Questions",
    description: "Use voice or text in Hindi/English to inquire about schemes.",
    exampleTitle: "user_query",
    example: "User: What schemes for small farmers?\n\nSaathi: You may qualify for:\n1. PM-KISAN\n2. KCC\n3. PMFBY",
  },
  {
    emoji: "🤖",
    title: "AI Processing",
    description: "Saathi analyzes documents to provide accurate, cited responses.",
    exampleTitle: "response",
    example:
      "Based on PM-KISAN doc:\n\nEligibility confirmed\n₹6000/year\n3 installments of ₹2000\nRequired: Aadhaar, land papers",
  },
  {
    emoji: "✅",
    title: "Get Matches",
    description: "Receive personalized scheme recommendations based on your profile.",
    exampleTitle: "matches",
    example: "Your matches:\n1. PM-KISAN: 100%\n2. KCC: 85%\n3. PMFBY: 70%\n\nNeed application details?",
  },
]

const faqs = [
  {
    question: "Is my data stored when using Saathi?",
    answer:
      "No, Saathi processes everything locally in your browser without storing personal data or documents on servers.",
  },
  {
    question: "Can I use default documents instead of uploading?",
    answer:
      "Yes, we provide common scheme documents to get started, but for best results upload your specific documents.",
  },
  {
    question: "How accurate are the answers?",
    answer: "Responses are directly extracted from your provided documents with source references for verification.",
  },
  {
    question: "Does it work well on mobile?",
    answer: "Absolutely. The interface is optimized for mobile with excellent voice interaction support.",
  },
  {
    question: "What document formats work best?",
    answer: "Text-based PDFs with clear structure work best. Scanned/image PDFs may require OCR processing first.",
  },
  {
    question: "Is there a cost to use Saathi?",
    answer: "Currently free. Future premium features may be added while keeping core functionality accessible.",
  },
]
