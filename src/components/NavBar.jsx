import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useNavigate, useSearchParams, useLocation, Link } from "react-router-dom";
import logo from "../assets/Images/logo.jpg";
import LoginModal from "./LoginModal";
import Sidebar from "./Sidebar";

function NavBar({ onCartClick }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [showLogin, setShowLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener("cartUpdate", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("cartUpdate", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-[100] transition-all duration-500 ${
          isScrolled 
          ? "bg-white/90 backdrop-blur-xl py-3 shadow-md border-b border-gray-100" 
          : "bg-white py-4 md:py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            <div className="flex-1 flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {["Home", "Collection", "About", "Contact"].map((item) => (
                  <Link 
                    key={item}
                    to={`/${item.toLowerCase()}`} 
                    className="text-[10px] xl:text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-emerald-600 transition-all relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>

            <div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer shrink-0 group" 
              onClick={() => navigate('/')}
            >
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden shadow-md border-2 border-emerald-50 p-0.5 group-hover:border-emerald-500 transition-all duration-500">
                <img src={logo} className="h-full w-full object-cover rounded-full" alt="Logo" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <h1 className="text-xl md:text-3xl font-[1000] text-gray-900 tracking-tighter uppercase italic">
                  FASHION<span className="text-emerald-500 transition-colors group-hover:text-black">HUB</span>
                </h1>
                <span className="text-[8px] font-bold tracking-[0.4em] text-gray-400 hidden sm:block">EST. 2026</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-3 md:gap-5">
              
              <div className="flex items-center relative">
                <div className={`
                  absolute right-0 transition-all duration-500 ease-in-out
                  ${isSearchOpen ? "w-[140px] sm:w-[200px] md:w-[280px] opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-4 pointer-events-none"}
                `}>
                  <form onSubmit={handleSearchSubmit}>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..." 
                      className="w-full bg-gray-100 px-4 py-2 rounded-full text-xs font-bold outline-none border border-transparent focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                    />
                  </form>
                </div>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2 rounded-full transition-all relative z-10 ${isSearchOpen ? "bg-red-50 text-red-500 rotate-90" : "hover:bg-gray-100"}`}
                >
                  {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
              </div>

              <button className="hidden sm:flex p-2 hover:bg-red-50 rounded-full group transition-all">
                <Heart size={20} className="group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
              </button>

              <button 
                onClick={onCartClick} 
                className="relative p-2.5 bg-black rounded-full hover:bg-emerald-600 transition-all duration-500 shadow-xl group active:scale-90"
              >
                <ShoppingBag size={18} className="text-white group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] h-5 w-5 flex items-center justify-center rounded-full border-2 border-white font-black animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setShowLogin(true)} 
                className="hidden md:block px-6 py-2.5 border-2 border-black text-black text-[11px] font-black rounded-full hover:bg-black hover:text-white transition-all duration-300 tracking-widest active:scale-95"
              >
                LOGIN
              </button>
            </div>

          </div>
        </div>
      </nav>

      <div className="h-[70px] md:h-[90px]"></div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

export default NavBar;