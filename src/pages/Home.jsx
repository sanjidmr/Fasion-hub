import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CartSidebar from "../components/CartSidebar";
import CategorySection from "../components/CategorySection";
import { products } from "../components/Products";
import { ArrowRight, Zap } from "lucide-react";
import BuyNowModal from "../components/BuyNowModal";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  // কার্ট সিঙ্ক লজিক
  const syncCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored);
  };

  useEffect(() => {
    syncCart();
    window.addEventListener("storage", syncCart);
    window.addEventListener("cartUpdate", syncCart);

    if (location.state?.openCart) {
      setIsCartOpen(true);
      window.history.replaceState({}, document.title);
    }
    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("cartUpdate", syncCart);
    };
  }, [location]);

  const handleUpdate = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleAddToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    let updatedCart = exist
      ? cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cartItems, { ...product, quantity: 1 }];
    handleUpdate(updatedCart);
    setIsCartOpen(true);
  };

  const handleRemove = (id, size) => {
    const updated = cartItems.filter((item) => !(item.id === id && item.selectedSize === size));
    handleUpdate(updated);
  };

  const handleQuantityChange = (id, size, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      (item.id === id && item.selectedSize === size) ? { ...item, quantity: newQty } : item
    );
    handleUpdate(updated);
  };

  const filteredProducts = activeCategory === "All"
    ? products.slice(0, 20)
    : products.filter(item => item.category === activeCategory).slice(0, 20);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-green-100">
      <NavBar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)} 
      />
      
      <Carousel />

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-24">
        
        <div className="mb-12 md:mb-20">
          <CategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse">
              <Zap size={14} fill="currentColor" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase italic">
              {activeCategory} <br />
              <span className="text-green-600 not-italic">STYLISH</span> <br className="md:hidden" /> ARRIVALS
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/Collection')} 
            className="group w-full md:w-auto flex items-center justify-center gap-4 bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm tracking-widest hover:bg-green-700 transition-all active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            BROWSE ALL <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard 
                product={{ ...product, quantity: 1 }} 
                onAddToCart={handleAddToCart} 
              />
            </div>
          ))}
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
        onQuantityChange={handleQuantityChange}
        onCheckoutClick={() => setIsBuyNowOpen(true)}
      />

      <BuyNowModal 
        isOpen={isBuyNowOpen} 
        onClose={() => setIsBuyNowOpen(false)} 
        items={cartItems} 
      />

      <Footer />
    </div>
  );
};

export default Home;