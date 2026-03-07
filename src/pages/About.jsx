import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shirt, Watch, Footprints, ShoppingBag, CheckCircle, Truck, ShieldCheck } from 'lucide-react';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CartSidebar from "../components/CartSideBar";
import BuyNowModal from "../components/BuyNowModal";

const AboutUs = () => {
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
    window.addEventListener("storage", loadCart);
    return () => {
      window.removeEventListener("cartUpdate", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const handleSearchChange = (value) => {
    setSearchParams({ search: value });
  };

  const handleRemove = (productId, size) => {
    const updated = cartItems.filter((item) => !(item.id === productId && item.selectedSize === size));
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const handleQuantityChange = (productId, size, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      (item.id === productId && item.selectedSize === size) ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-amber-100">
      <NavBar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={totalItems}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
      />

      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Banner"
            className="w-full h-full object-cover object-center transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
            Define Your <span className="text-amber-400">Identity</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Bringing you the finest blend of tradition and trend. From premium Panjabis to luxury watches—we curate style for every occasion.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 bg-amber-50 rounded-full">
              <span className="text-amber-600 text-xs font-black uppercase tracking-widest">Our Legacy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase">Our Craft & <br className="hidden md:block"/> Culture</h2>
            <div className="w-20 h-1.5 bg-amber-500 rounded-full mx-auto lg:mx-0"></div>
            <div className="space-y-4 md:space-y-6 text-gray-500 text-base md:text-lg leading-relaxed font-medium">
              <p>
                Founded in 2024, our brand was born out of a simple idea: <b className="text-gray-900">"Quality fashion should be timeless."</b>
              </p>
              <p>
                Today, we proudly offer a diverse range including <b className="text-gray-900">Men's & Women's wear, Panjabis, Premium Shoes, and Luxury Watches</b>. Every piece is a testament to our commitment to excellence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="space-y-3 md:space-y-6">
              <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop" alt="Men" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl hover:scale-[1.02] transition duration-500" />
              <img src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop" alt="Acc" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl hover:scale-[1.02] transition duration-500" />
            </div>
            <div className="pt-8 md:pt-16 space-y-3 md:space-y-6">
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" alt="Women" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl hover:scale-[1.02] transition duration-500" />
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" alt="Shoes" className="rounded-[2rem] md:rounded-[3rem] shadow-2xl hover:scale-[1.02] transition duration-500" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">What We Offer</h2>
            <p className="text-gray-400 font-medium tracking-widest text-[10px] md:text-xs uppercase">Curated collections for the modern lifestyle</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <Shirt size={32} />, title: "Clothing", desc: "Shirts, Pants & Panjabis" },
              { icon: <ShoppingBag size={32} />, title: "Women's", desc: "Elegant Dresses" },
              { icon: <Footprints size={32} />, title: "Footwear", desc: "Shoes & Casuals" },
              { icon: <Watch size={32} />, title: "Accessories", desc: "Watches & More" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-transparent hover:border-amber-500 transition-all duration-500 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 group">
                <div className="bg-amber-50 w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-6 md:mb-8 text-amber-600 group-hover:bg-amber-500 group-hover:text-white group-hover:rotate-[10deg] transition duration-500">
                  {item.icon}
                </div>
                <h3 className="font-black text-lg md:text-xl mb-2 uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-28 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center text-center group">
            <div className="p-5 bg-gray-50 rounded-full mb-6 group-hover:bg-amber-50 transition-colors duration-500">
              <Truck className="text-amber-600 group-hover:scale-110 transition-transform" size={40} />
            </div>
            <h4 className="font-black text-lg uppercase tracking-tight mb-2">Fast Delivery</h4>
            <p className="text-xs md:text-sm text-gray-400 font-medium max-w-[200px]">Across the country in 48-72 hours.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="p-5 bg-gray-50 rounded-full mb-6 group-hover:bg-amber-50 transition-colors duration-500">
              <ShieldCheck className="text-amber-600 group-hover:scale-110 transition-transform" size={40} />
            </div>
            <h4 className="font-black text-lg uppercase tracking-tight mb-2">Premium Quality</h4>
            <p className="text-xs md:text-sm text-gray-400 font-medium max-w-[200px]">Handpicked fabrics and materials.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="p-5 bg-gray-50 rounded-full mb-6 group-hover:bg-amber-50 transition-colors duration-500">
              <CheckCircle className="text-amber-600 group-hover:scale-110 transition-transform" size={40} />
            </div>
            <h4 className="font-black text-lg uppercase tracking-tight mb-2">Hassle-free Return</h4>
            <p className="text-xs md:text-sm text-gray-400 font-medium max-w-[200px]">Easy 7-day exchange policy.</p>
          </div>
        </div>
      </section>

      <Footer />

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
    </div>
  );
};

export default AboutUs;