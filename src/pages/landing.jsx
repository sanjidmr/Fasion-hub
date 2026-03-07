import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Menu } from 'lucide-react';
import LoginModal from "../components/LoginModal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 selection:bg-green-500 selection:text-black">

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 sm:px-10 lg:px-16 py-6 md:py-8">
        <div className="text-xl md:text-2xl font-black tracking-tighter text-white group cursor-pointer">
          FASHION <span className="text-green-500 group-hover:text-white transition-colors">HUB</span>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-2 text-white font-bold hover:text-green-400 transition-all uppercase text-[10px] md:text-xs tracking-[0.2em] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-green-500/50"
          >
            <User size={16} className="md:w-[18px]" />
            <span className="hidden sm:inline">Login</span>
          </button>

          <button className="text-white p-2 hover:bg-white/10 rounded-lg md:hidden transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full flex items-center justify-center md:justify-start overflow-hidden">

        {/* Background Image - Shadow-free & Premium */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Banner"
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </div>

        {/* Content Area */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center md:items-start text-center md:text-left">

          {/* New White Jumping Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8 animate-bounce-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-white text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase">
              NEW COLLECTION 2026
            </span>
          </div>

          {/* Premium Heading */}
          <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 md:mb-8 uppercase tracking-tighter">
            ELEVATE YOUR <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              DAILY STYLE
            </span>
          </h1>

          <p className="text-gray-200 text-sm md:text-base lg:text-lg max-w-[280px] sm:max-w-md md:max-w-lg mb-10 md:mb-12 leading-relaxed font-medium drop-shadow-lg">
            Redefine your style with our premium, high-comfort collections designed to make you stand out from the crowd.
          </p>

          {/* New Eye-Catchy Button Text */}
          <button
  onClick={() => navigate('/home')}
  className="group relative flex items-center gap-4 bg-white text-black pl-7 pr-2 py-2 rounded-full font-black text-[11px] md:text-xs tracking-[0.3em] hover:bg-green-500 hover:text-white transition-all duration-500 shadow-xl active:scale-95 overflow-hidden border border-white/20"
>
  <span className="relative z-10 uppercase">SHOP NOW</span>
  <div className="relative z-10 bg-black group-hover:bg-white text-white group-hover:text-black p-2.5 rounded-full transition-all duration-500 transform group-hover:translate-x-1">
    <ArrowRight size={16} />
  </div>
</button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default LandingPage;