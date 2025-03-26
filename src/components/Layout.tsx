
import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-1 px-4 sm:px-6 md:px-8 py-8 max-w-7xl mx-auto w-full"
      >
        {children}
      </motion.main>
      <footer className="py-6 px-4 sm:px-6 md:px-8 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-gray-900">whatsCET</h3>
            <p className="text-sm text-gray-500">Your campus navigation companion</p>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} whatsCET. All rights reserved.
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
