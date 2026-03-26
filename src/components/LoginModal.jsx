import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
          {/* Background Overlay - Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[6px]"
          />

          {/* Modal Box - Premium Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[480px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            {/* Content Transition Wrapper */}
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500 mt-2 text-sm font-medium">
                  {isLogin ? 'Sign in to Fashion Hub' : 'Join our fashion community'}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-1"
                  >
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-green-600 transition-all placeholder:text-gray-300 text-sm font-semibold"
                    />
                  </motion.div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-green-600 transition-all placeholder:text-gray-300 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-green-600 transition-all placeholder:text-gray-300 text-sm font-semibold"
                  />
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button className="text-[11px] font-bold text-gray-400 hover:text-green-700 transition-colors uppercase tracking-wider">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-green-100 active:scale-95">
                  {isLogin ? 'Login' : 'Sign Up'}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-white px-4 text-gray-400 font-bold tracking-[0.3em]">Or</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3.5 rounded-2xl hover:bg-gray-50 transition-all group active:scale-[0.98]"
                onClick={() => console.log("Google Login Clicked")}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                />
                <span className="text-gray-700 font-bold text-sm">Continue with Google</span>
              </button>

              {/* Footer Toggle */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-xs font-medium">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 font-black text-green-700 hover:text-green-900 transition-colors underline decoration-2 underline-offset-4"
                  >
                    {isLogin ? 'REGISTER NOW' : 'LOG IN'}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;