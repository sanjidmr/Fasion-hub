import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { products } from '../components/Products';
import NavBar from "../components/NavBar";
import CartSideBar from "../components/CartSideBar";
import BuyNowModal from "../components/BuyNowModal";

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

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

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const defaultSize = "M";
    const existIndex = currentCart.findIndex(
      (item) => item.id === product.id && item.selectedSize === defaultSize
    );
    let updatedCart = [...currentCart];
    if (existIndex !== -1) {
      updatedCart[existIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1, selectedSize: defaultSize });
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdate"));
    setIsCartOpen(true);
  };

  const handleRemove = (productId, size) => {
    const updated = cartItems.filter((item) => !(item.id === productId && item.selectedSize === size));
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleQuantityChange = (productId, size, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      (item.id === productId && item.selectedSize === size) ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleSearchChange = (value) => {
    setSearchParams({ search: value });
  };

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map((p) => p.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100">
      <NavBar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
      />

      <div className="sticky top-[70px] md:top-[90px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight uppercase italic">
              {searchTerm ? (
                <span>Search: <span className="text-emerald-500">"{searchTerm}"</span></span>
              ) : "COLLECTION"}
            </h1>

            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar mask-gradient-mobile md:mask-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(12); }}
                  className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border-2 ${
                    activeCategory === cat 
                    ? 'bg-black text-white border-black shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-16">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
            {displayedProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gray-50 shadow-sm border border-transparent hover:border-gray-100 transition-all duration-500">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />

                  <div className="hidden lg:flex absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500 items-center justify-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="p-4 bg-white text-black rounded-full shadow-2xl hover:bg-black hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-300"
                    >
                      <span className="font-black text-[10px] uppercase tracking-tighter">Add to Cart</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="p-4 bg-black text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all transform translate-y-8 group-hover:translate-y-0 duration-500"
                    >
                      <span className="font-black text-[10px] uppercase tracking-tighter">View</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="lg:hidden absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-black py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                  >
                    QUICK ADD +
                  </button>
                </div>

                <div className="mt-5 px-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{product.category}</span>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight line-clamp-1">{product.name}</h3>
                    </div>
                    <p className="text-base md:text-lg font-black text-gray-900">৳{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 flex flex-col items-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🔍</span>
             </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase italic">No items found</h2>
            <p className="text-gray-400 text-sm font-medium mt-2 tracking-widest uppercase">Try adjusting your filters or search terms</p>
          </div>
        )}

        {visibleCount < filteredProducts.length && (
          <div className="mt-20 md:mt-32 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 12)} 
              className="group relative px-12 py-5 bg-black text-white rounded-full font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all active:scale-95 shadow-2xl"
            >
              <span className="relative z-10">Load More</span>
              <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
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