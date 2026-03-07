import React, { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom'; 
import { Mail, Send, Instagram, Facebook, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import NavBar from "../components/NavBar";
import CartSidebar from "../components/CartSidebar";
import BuyNowModal from "../components/BuyNowModal";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    };
    loadCart();
    window.addEventListener("cartUpdate", loadCart);
    return () => window.removeEventListener("cartUpdate", loadCart);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800 selection:bg-emerald-100 selection:text-emerald-900">
      <NavBar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={totalItems}
        searchTerm={searchTerm}
      />

      {/* --- Refined Hero Section with Image Background --- */}
      <div className="relative h-[45vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1500&q=80"
            className="w-full h-full object-cover scale-105"
            alt="FashionHub Background"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full mb-6 backdrop-blur-md">
             <Sparkles size={12} className="text-emerald-400" />
             <span className="text-white text-[10px] font-medium uppercase tracking-[0.4em]">Online Studio</span>
          </div>
          {/* Light, Elegant Header Styling */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none italic font-serif">
            Get in <span className="font-extralight text-emerald-400 not-italic">Touch</span>
          </h1>
          <p className="mt-4 text-white/60 text-xs md:text-sm font-light tracking-widest uppercase">We are where you are — Online.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* --- Left Side: Social & Support (Less Bold) --- */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light text-zinc-900 tracking-tight">Digital <span className="italic">Connect</span></h2>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-light">
                Our physical presence is digital. Connect with us through our official social channels or drop an email.
              </p>
            </div>
            
            <div className="space-y-2">
              {[
                { icon: <Instagram size={18}/>, label: "Instagram", val: "@fashionhub.bd", link: "#" },
                { icon: <Facebook size={18}/>, label: "Facebook", val: "FashionHub Official", link: "#" },
                { icon: <MessageCircle size={18}/>, label: "WhatsApp", val: "+880 1XXX-XXXXXX", link: "#" },
                { icon: <Mail size={18}/>, label: "Email", val: "support@fashionhub.com", link: "#" }
              ].map((item, i) => (
                <a key={i} href={item.link} className="flex items-center justify-between p-5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="text-zinc-400 group-hover:text-emerald-500 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-medium text-zinc-700">{item.val}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Right Side: Clean Message Form --- */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-zinc-100 shadow-sm">
            <div className="mb-10">
              <h2 className="text-xl font-medium text-zinc-900 mb-2">Send Message</h2>
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-medium">Typically responds within 2 hours</p>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input type="text" required className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-light focus:outline-none focus:border-emerald-500 transition-all peer placeholder-transparent" placeholder="Name" />
                <label className="absolute left-0 top-0 text-[10px] font-medium uppercase tracking-widest text-zinc-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-emerald-500 transition-all pointer-events-none">Name</label>
              </div>

              <div className="relative group">
                <input type="email" required className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-light focus:outline-none focus:border-emerald-500 transition-all peer placeholder-transparent" placeholder="Email" />
                <label className="absolute left-0 top-0 text-[10px] font-medium uppercase tracking-widest text-zinc-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-emerald-500 transition-all pointer-events-none">Email</label>
              </div>

              <div className="relative group">
                <textarea rows="3" required className="w-full bg-transparent border-b border-zinc-200 py-3 text-sm font-light focus:outline-none focus:border-emerald-500 transition-all peer placeholder-transparent resize-none" placeholder="Message"></textarea>
                <label className="absolute left-0 top-0 text-[10px] font-medium uppercase tracking-widest text-zinc-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-emerald-500 transition-all pointer-events-none">Your Message</label>
              </div>

              <button className="group relative w-full h-14 bg-zinc-900 text-white rounded-xl font-medium uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Send Now <Send size={14} />
                </span>
                <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />

      <BuyNowModal
        isOpen={isBuyNowOpen}
        onClose={() => setIsBuyNowOpen(false)}
        items={cartItems}
      />
    </div>
  );
};

export default ContactPage;