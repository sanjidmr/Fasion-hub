import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Animation library
import { products } from "../components/Products";
import NavBar from "../components/NavBar";
import CartSideBar from "../components/CartSideBar";
import BuyNowModal from "../components/BuyNowModal";

const Collection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get("search") || "";
  const categoryParam = (searchParams.get("category") || "all").toLowerCase();

  const [visibleCount, setVisibleCount] = useState(12);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  useEffect(() => {
    setVisibleCount(12);
    window.scrollTo(0, 0);
  }, [categoryParam, searchTerm]);

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    };
    loadCart();
    const handleSync = () => {
      const updated = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updated);
    };
    window.addEventListener("cartUpdate", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("cartUpdate", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const handleRemove = (productId, size) => {
    const updated = cartItems.filter(
      (item) => !(item.id === productId && item.selectedSize === size)
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleQuantityChange = (productId, size, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item.id === productId && item.selectedSize === size
        ? { ...item, quantity: newQty }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.category) return false;
      const productCats = Array.isArray(product.category)
        ? product.category.map((c) => String(c).toLowerCase())
        : [String(product.category).toLowerCase()];
      const productName = String(product.name || "").toLowerCase();
      const matchesCategory = categoryParam === "all" || productCats.includes(categoryParam);
      const matchesSearch = productName.includes(searchTerm.toLowerCase()) ||
        productCats.some((cat) => cat.includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [categoryParam, searchTerm]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Children ektar por ekta ashbe
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100">
      <NavBar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)}
      />

      {/* Title Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-8 md:pt-16 pb-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl sm:text-2xl md:text-5xl font-black text-gray-900 tracking-tight uppercase italic"
        >
          {searchTerm ? (
            <span>Search: <span className="text-emerald-500">"{searchTerm}"</span></span>
          ) : (
            <span>{categoryParam === "all" ? "Full Collection" : categoryParam}</span>
          )}
        </motion.h1>
        <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-2 tracking-[0.25em] uppercase">
          Total {filteredProducts.length} Items Found
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 md:py-16">
        {displayedProducts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-14"
          >
            {displayedProducts.map((product) => (
              <motion.div 
                key={product.id} 
                variants={cardVariants}
                className="group flex flex-col"
              >
                {/* Image Wrapper */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[3rem] bg-gray-50 border border-transparent hover:border-emerald-100 transition shadow-sm cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay Gradient (Optional: Image ke fute tular jonno) */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Info Section */}
                <div
                  className="mt-4 px-1 flex justify-between items-start cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div>
                    <span className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                      {Array.isArray(product.category) ? product.category[0] : product.category}
                    </span>
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base font-black text-gray-900">
                    ৳{product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">No items found</h2>
            <button onClick={() => navigate("/collection?category=all")} className="mt-4 text-emerald-600 font-bold border-b-2 border-emerald-600 uppercase text-xs tracking-widest">
              Back to all products
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-16 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-8 md:px-12 py-3 md:py-5 bg-black text-white rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition shadow-xl"
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>

      <CartSideBar
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
    </div>
  );
};

export default Collection;