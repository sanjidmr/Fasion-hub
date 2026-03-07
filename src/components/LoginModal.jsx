import React, { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xl transition-opacity duration-700"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-[440px] bg-white/95 backdrop-blur-2xl rounded-[30px] sm:rounded-[40px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 my-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-black hover:rotate-90 transition-all duration-500 z-10"
        >
          <X size={20} className="sm:w-[22px]" />
        </button>

        <div className="p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.1em] md:tracking-[0.15em] text-gray-900 uppercase italic leading-tight">
              FASHION<span className="text-emerald-500">HUB</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              Exclusive Member Access
            </p>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300">
                <Mail size={16} className="sm:w-[18px]" />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full pl-12 sm:pl-14 pr-6 py-4 sm:py-5 bg-gray-50/50 border border-gray-100 rounded-2xl sm:rounded-3xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all duration-300 font-medium text-gray-800 text-sm sm:text-base"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300">
                <Lock size={16} className="sm:w-[18px]" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full pl-12 sm:pl-14 pr-14 sm:pr-16 py-4 sm:py-5 bg-gray-50/50 border border-gray-100 rounded-2xl sm:rounded-3xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all duration-300 font-medium text-gray-800 text-sm sm:text-base"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={16} className="sm:w-[18px]" /> : <Eye size={16} className="sm:w-[18px]" />}
              </button>
            </div>

            <div className="flex justify-end px-1 sm:px-2">
              <button className="text-[10px] sm:text-[11px] font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-wider transition-colors">
                Forgot Password?
              </button>
            </div>

            <button className="group relative w-full mt-2 md:mt-4 bg-gray-900 text-white py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-xs sm:text-sm tracking-widest overflow-hidden transition-all active:scale-95 shadow-xl shadow-black/10">
              <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                SIGN IN
                <ArrowRight size={16} className="sm:w-[18px] group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </button>
          </form>

          <div className="relative flex items-center justify-center my-8 md:my-10">
            <div className="w-full border-t border-gray-100"></div>
            <span className="absolute bg-white px-4 text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] md:tracking-[0.4em] whitespace-nowrap">Secure Login</span>
          </div>

          <button className="w-full flex items-center justify-center gap-3 sm:gap-4 py-3.5 sm:py-4.5 border border-gray-200 rounded-2xl sm:rounded-3xl hover:bg-gray-50 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group active:scale-95">
            <div className="shrink-0">
              <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-700 tracking-tight">Continue with Google</span>
          </button>

          <p className="mt-6 md:mt-8 text-center text-[9px] sm:text-[10px] text-gray-400 font-medium px-4 sm:px-6 leading-relaxed">
            By signing in, you agree to our <span className="text-gray-900 underline cursor-pointer">Terms</span> and <span className="text-gray-900 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;