import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Calendar, Map, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    { path: "/events", label: "Events", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { path: "/college", label: "College", icon: <Map className="h-4 w-4 mr-2" /> }
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <motion.div
              className="font-bold text-xl text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Wht@CET
            </motion.div>
          </NavLink>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                  )
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/accessibility"
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 line-through",
                  isActive
                    ? "text-primary/50 bg-primary/5"
                    : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                )
              }
            >
              Accessibility
              <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">Soon</span>
            </NavLink>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden glass-nav border-t border-gray-200/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 rounded-md text-base font-medium",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/accessibility"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-500 hover:bg-gray-100 line-through"
              >
                Accessibility
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">Soon</span>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
