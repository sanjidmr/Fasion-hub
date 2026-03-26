import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, Phone, Facebook, Instagram, User } from "lucide-react";
import { useNavigate, useSearchParams, Link, useLocation } from "react-router-dom";
import logo from "../assets/Images/logo.jpg";
import LoginModal from "./LoginModal";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import WishlistSidebar from "./WishlistSidebar";

function NavBar({ onCartClick }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  // Sidebar state name fix kora hoyeche jate error na dey
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    { name: "Men", value: "men" },
    { name: "Women", value: "women" },
    { name: "Kids", value: "kids" },
    { name: "Shoes", value: "Shoes" },
    { name: "Watch", value: "Watch" },
    { name: "Accessory", value: "Accessory" },
  ];

  const transparentPages = ["/", "/about", "/contact"];
  const isTransparentPage = transparentPages.includes(location.pathname);
  const isActuallyTransparent = isTransparentPage && !isScrolled;
  const isTextWhite = isActuallyTransparent;

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartTotal = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setCartCount(cartTotal);
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };
    updateCounts();
    window.addEventListener("cartUpdate", updateCounts);
    window.addEventListener("wishlistUpdate", updateCounts);
    window.addEventListener("storage", updateCounts);
    return () => {
      window.removeEventListener("cartUpdate", updateCounts);
      window.removeEventListener("wishlistUpdate", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (val) => {
    navigate(`/collection?category=${val.toLowerCase()}`);
  };

  return (
    <>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <nav className={`w-full fixed top-0 left-0 z-[100] font-sans transition-all duration-500 ${isActuallyTransparent
        ? "bg-transparent"
        : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
        }`}>

        {/* --- 1. TOP BAR --- */}
        <div className={`hidden lg:block transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
          } ${isTextWhite ? 'bg-black/10 backdrop-blur-sm' : 'bg-[#F8F9F7] border-b border-gray-100'}`}>
          <div className="max-w-[1440px] mx-auto px-10 h-full flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className={`flex gap-8 ml-5 ${isTextWhite ? 'text-white' : 'text-gray-500'}`}>
              <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
            </div>
            <div className={`flex items-center gap-6 border-l pl-6 ${isTextWhite ? 'border-white/20 text-white' : 'border-gray-200 text-gray-500'}`}>
              <span className="flex items-center gap-2">
                <Phone size={12} className="text-emerald-500" /> +880 16458 32896
              </span>
              <div className="flex gap-4 ml-4">
                <Facebook size={14} className="hover:text-blue-600 cursor-pointer transition-colors" />
                <Instagram size={14} className="hover:text-pink-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. MAIN NAVBAR --- */}
        <div className={`transition-all duration-500 ${isScrolled ? "py-2" : "py-3 md:py-6"}`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-10">
            <div className="flex justify-between items-center">

              <div className="flex items-center">
                {/* Menu Button Fixed */}
                <button onClick={() => setIsSidebarOpen(true)} className={`lg:hidden p-2 -ml-2 rounded-full transition-colors ${!isTextWhite ? "text-zinc-900" : "text-white"
                  }`}>
                  <Menu size={24} />
                </button>

                <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.value)}
                      className={`px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-tighter transition-all relative group ${!isTextWhite ? "text-gray-600 hover:text-emerald-600" : "text-white hover:text-emerald-400"
                        }`}
                    >
                      {cat.name}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                <div className={`transition-all duration-500 overflow-hidden rounded-full border ${!isTextWhite ? 'h-7 w-7 md:h-8 md:w-8 border-gray-100' : 'h-8 w-8 md:h-12 md:w-12 border-white/20'
                  }`}>
                  <img src={logo} className="h-full w-full object-cover" alt="Logo" />
                </div>
                <h1 className={`font-black tracking-tighter uppercase italic transition-all duration-500 ${!isTextWhite ? 'text-base md:text-xl text-zinc-900' : 'text-xl md:text-3xl text-white'
                  }`}>
                  FASHION<span className={`${!isTextWhite ? 'text-emerald-500' : 'text-emerald-400'}`}>HUB</span>
                </h1>
              </div>

              <div className="flex items-center justify-end gap-1 sm:gap-4">
                <button onClick={() => setIsSearchOpen(true)} className={`p-2 rounded-full ${!isTextWhite ? "text-zinc-800" : "text-white"
                  }`}>
                  <Search size={18} className="md:w-5 md:h-5" />
                </button>

                <button onClick={() => setIsWishlistOpen(true)} className="hidden md:block relative p-2.5 rounded-full group transition-colors">
                  <Heart size={20} className={`${!isTextWhite ? "text-zinc-800" : "text-white"}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] h-4 w-4 flex items-center justify-center rounded-full border border-white font-black">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button onClick={onCartClick} className="relative p-2 md:p-2.5 bg-zinc-900 rounded-full hover:bg-emerald-600 transition-all shadow-lg active:scale-90">
                  <ShoppingBag size={16} className="text-white md:w-[18px] md:h-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] md:text-[9px] h-4 w-4 md:h-5 md:w-5 flex items-center justify-center rounded-full border-2 border-white font-black">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setShowLogin(true)}
                  className={`p-2 md:p-2.5 flex items-center justify-center rounded-full border-2 transition-all active:scale-90 ${!isTextWhite ? "bg-white border-zinc-900 text-zinc-900" : "bg-transparent border-white text-white"
                    }`}
                >
                  <User size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </nav>

      <div className={`transition-all duration-500 ${isActuallyTransparent
        ? 'h-0'
        : isScrolled
          ? 'h-[55px] md:h-[75px]'
          : 'h-[80px] md:h-[140px]'
        }`}></div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onLoginClick={() => setShowLogin(true)} // Fix kora hoyeche
      />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}

export default NavBar;