import { DollarSign, Menu, X, Bell, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              ResellTracker
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/dashboard" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="/analytics" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Analytics
            </a>
            <a 
              href="/inventory" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Inventory
            </a>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              {user && (
                <button
                  onClick={() => signOut()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              <a
                href="/dashboard"
                className="block px-4 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/analytics"
                className="block px-4 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                Analytics
              </a>
              <a
                href="/inventory"
                className="block px-4 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                Inventory
              </a>
              <div className="flex items-center space-x-4 px-4 py-2">
                <button className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              {user && (
                <button
                  onClick={() => signOut()}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}