import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ChevronRight, TrendingUp, BarChart2, Users, Loader } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function AuthPage() {
  const { signInWithGoogle, quickSignUp, loading, error, checkRedirectResult, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [isQuickSignup, setIsQuickSignup] = useState(false);

  useEffect(() => {
    checkRedirectResult();
  }, [checkRedirectResult]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleQuickSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await quickSignUp(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              ResellTracker
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Your AI-Powered Market Intelligence for Amazon, Shopify & TikTok Shop
            </p>

            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl mb-8">
              <button
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mb-6 disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="animate-spin mr-2 h-5 w-5" />
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Continue with Google
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white">Or get instant access</span>
                </div>
              </div>

              <form onSubmit={handleQuickSignUp} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <Loader className="animate-spin mr-2 h-5 w-5" />
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Get Started
                    </>
                  )}
                </button>
              </form>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-red-300 text-sm bg-red-900/20 p-3 rounded-lg"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Market Data</h3>
              <p className="text-purple-200">Live product trends and pricing analytics across platforms</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <div className="bg-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Predictions</h3>
              <p className="text-purple-200">ML-powered trend forecasting and demand analysis</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <div className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Market Insights</h3>
              <p className="text-purple-200">Competitive analysis and market opportunity alerts</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}