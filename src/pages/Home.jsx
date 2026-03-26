import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Framer Motion Import
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CartSidebar from "../components/CartSidebar";
import CategorySection from "../components/CategorySection";
import { products } from "../components/Products";
import { ArrowRight, Zap, Stars } from "lucide-react";
import BuyNowModal from "../components/BuyNowModal";
import AnnouncementBar from "../components/AnnouncementBar";
import EidCountdownBanner from "../components/EidCountdownBanner";

// Assets
import s2 from "../assets/Images/s2.jpg";
import pn5 from "../assets/Images/pn5.jpg";
import p6 from "../assets/Images/p6.jpg";
import b1 from "../assets/Images/b1.jpg";
import b2 from "../assets/Images/b2.jpg";
import b4 from "../assets/Images/b4.jpg";
import ss2 from "../assets/Images/ss2.jpg";
import sp1 from "../assets/Images/sp1.jpg";

// Animation Variants (Premium Settings)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const syncCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored);
  };

  useEffect(() => {
    syncCart();

    window.addEventListener("storage", syncCart);
    window.addEventListener("cartUpdate", syncCart);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    if (location.state?.openCart) {
      setIsCartOpen(true);
      window.history.replaceState({}, document.title);
    }

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("cartUpdate", syncCart);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  // Calculate Subtotal Safely
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }, [cartItems]);

  const handleUpdate = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleAddToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);

    let updatedCart = exist
      ? cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [...cartItems, { ...product, quantity: 1 }];

    handleUpdate(updatedCart);
    setIsCartOpen(true);
  };

  const handleRemove = (id, size) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.selectedSize === size)
    );
    handleUpdate(updated);
  };

  const handleQuantityChange = (id, size, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id && item.selectedSize === size
        ? { ...item, quantity: newQty }
        : item
    );
    handleUpdate(updated);
  };

  const randomNewArrivals = useMemo(() => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  }, []);

  const eidSpecialProducts = products.filter(
    (p) => p.id >= 1 && p.id <= 12
  );

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans overflow-x-hidden">
      <NavBar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)}
      />

      {/* --- HERO SECTION --- */}
      <main className="relative w-full">
        {isScrolled && (
          <div className="fixed top-[60px] md:top-[80px] w-full z-[90]">
            <AnnouncementBar />
          </div>
        )}

        <div className="w-full">
          <Carousel />
        </div>
      </main>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mb-16 md:mb-20"
        >
          <CategorySection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </motion.div>

        <div className="mb-20 md:mb-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-12"
          >
            <div>
              <div className="flex items-center gap-2 text-green-600 font-bold uppercase text-xs tracking-[0.3em] mb-2">
                <Zap size={16} /> Just Dropped
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                New Arrivals
              </h2>
            </div>

            <button
              onClick={() => navigate("/Collection")}
              className="group flex items-center gap-3 bg-black text-white px-8 py-3 md:px-10 md:py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-green-700 transition shadow-xl"
            >
              EXPLORE ALL
              <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
            </button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {randomNewArrivals.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard
                  product={{ ...product, quantity: 1 }}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative mb-20 md:mb-32 overflow-hidden rounded-[30px] md:rounded-[60px] bg-[#080808] p-6 md:p-24 min-h-[500px] md:min-h-[700px] flex items-center"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900/10 blur-[200px] rounded-full"></div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                Summer <br />
                <span className="font-serif italic font-light text-zinc-300">
                  Special
                </span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-lg max-w-sm mx-auto lg:mx-0 mb-10">
                Defining the essence of modern elegance. Explore our most anticipated collection.
              </p>
              <button
                onClick={() => navigate("/Collection")}
                className="group px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Discover Collection
              </button>
            </div>

            {/* Right Content - Modern Staggered Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-8 items-start">

                {/* First Column */}
                <div className="flex flex-col gap-4 md:gap-8">
                  <div className="overflow-hidden rounded-3xl aspect-[3/4]">
                    <img src={s2} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Summer Look 1" />
                  </div>
                  <div className="overflow-hidden rounded-3xl aspect-square">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Shoes Detail" />
                  </div>
                </div>

                {/* Second Column (Slightly Offset) */}
                <div className="flex flex-col gap-4 md:gap-8 mt-12 md:mt-20">
                  <div className="overflow-hidden rounded-3xl aspect-square">
                    <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c" className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Summer Look 2" />
                  </div>
                  <div className="overflow-hidden rounded-3xl aspect-[3/4]">
                    <img src={pn5} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Collection Detail" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-20">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-center gap-4 mb-12"
          >
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-g-600"></div>
            <h2 className="text-2xl md:text-4xl font-black tracking-[0.3em] text-gray-700 flex items-center gap-2 uppercase">
              Your Summer
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-green-600"></div>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {/* slice(0, 20) diye prothom 20-ti product set kora hoyeche */}
            {eidSpecialProducts
              .slice(0, 20)
              .map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard
                    product={{ ...product, quantity: 1 }}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          {/* Left Card: Enjoy Your Summer */}
          <div className="relative group overflow-hidden rounded-[40px] h-[450px] md:h-[550px] bg-zinc-900 flex items-end shadow-2xl">
            <img
              src={ss2}
              alt="Summer with Fashion Hub"
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="relative z-10 p-10 w-full">
              <div className="inline-block px-4 py-1 bg-green-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-md mb-4 shadow-lg">
                SUMMER COLLECTION
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                ENJOY YOUR <span className="text-green-500">SUMMER</span> <br />
                WITH FASHION HUB
              </h2>
              <p className="text-zinc-200 mt-4 text-sm font-medium drop-shadow-md">
                Discover the ultimate comfort in style.
              </p>
            </div>
          </div>

          {/* Right Card: Summer Style Vibes */}
          <div className="relative group overflow-hidden rounded-[40px] h-[450px] md:h-[550px] bg-zinc-900 flex items-center justify-center text-center shadow-2xl md:mt-12">
            <img
              src={sp1}
              alt="Summer Style Wish"
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all"></div>
            <div className="relative z-10 px-6">
              <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                SUMMER <br />
                <span className="text-green-500 font-serif italic">STYLE</span>
              </h2>
              <div className="mt-6 h-[2px] w-20 bg-white mx-auto"></div>
              <p className="text-white mt-6 text-lg font-bold tracking-widest uppercase drop-shadow-lg">
                Defining Modern Elegance
              </p>
            </div>
          </div>
        </div>

        <EidCountdownBanner />
      </motion.div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
        onQuantityChange={handleQuantityChange}
        onCheckoutClick={() => setIsBuyNowOpen(true)}
      />

      {/* FIXED BUY NOW MODAL CALL */}
      <BuyNowModal
        isOpen={isBuyNowOpen}
        onClose={() => setIsBuyNowOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
      />

      <Footer />
    </div>
  );
};

export default Home;