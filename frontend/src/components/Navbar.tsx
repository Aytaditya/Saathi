import { motion } from "framer-motion"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="relative p-6 flex justify-between items-center bg-black/95 backdrop-blur-lg border-b border-gray-900 z-50">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent cursor-pointer"
          onClick={()=>navigate("/dashboard")}

        >
          Saathi
        </motion.h1>
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {["Features", "How it Works", "FAQ"].map((item) => (
              <motion.li key={item} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-400 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        {/* <motion.a
          href="#start"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm tracking-wide hover:bg-gray-200 transition-all border border-white/10 shadow-lg"
        >
          Try Now
        </motion.a> */}
        <motion.a whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <SignedOut>
            <SignInButton
              forceRedirectUrl="/dashboard"
              className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm tracking-wide hover:bg-gray-200 transition-all border border-white/10 shadow-lg"
            />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

        </motion.a>
      </header>
  )
}

export default Navbar
