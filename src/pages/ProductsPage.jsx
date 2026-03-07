import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronRight, ArrowRight, Minus, Plus, Sparkles, ShieldCheck, Truck, Info } from 'lucide-react';
import { products } from "../components/Products"; 
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import BuyNowModal from "../components/BuyNowModal";
import CartSidebar from "../components/CartSidebar";

const ProductsPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const syncCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored);
  };

  useEffect(() => {
    syncCart();
    if (product) setMainImage(product.image);
    window.scrollTo(0, 0);
    window.addEventListener("cartUpdate", syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener("cartUpdate", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, [id, product]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existIndex = cart.findIndex((item) => item.id === product.id && item.selectedSize === selectedSize);

    let updatedCart = [...cart];
    if (existIndex !== -1) {
      updatedCart[existIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity, selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdate"));
    setIsCartOpen(true);
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

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100">
      <NavBar onCartClick={() => setIsCartOpen(true)} cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)} />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 md:pt-10 pb-20">
        
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-gray-400 mb-6 md:mb-10 font-black uppercase tracking-[0.2em]">
          <span className="hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/collection")}>Collection</span>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-black truncate max-w-[150px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-32">
          
          {/* Product Image */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32 aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-gray-50 group border border-gray-100 shadow-2xl shadow-gray-200/50 transition-all duration-700">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-6 md:space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-emerald-600 uppercase mb-4 bg-emerald-50 px-3 py-1 rounded-full">
                  <Sparkles size={12} fill="currentColor" /> PREMIUM EDITION
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 uppercase italic leading-[0.9] tracking-tighter">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6">
                  <span className="text-3xl md:text-4xl font-black text-gray-900">৳{product.price}</span>
                  <span className="text-lg md:text-xl text-gray-300 line-through font-bold">৳{product.price + 1000}</span>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Size</span>
                   <span className="text-[10px] font-bold text-emerald-600 underline cursor-pointer">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)} 
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] border-2 font-black text-sm md:text-base transition-all duration-300 active:scale-90 ${selectedSize === size ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 text-gray-400 hover:border-black hover:text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="text-[10px] font-black uppercase mb-4 block text-gray-400 tracking-widest">Quantity</span>
                <div className="flex items-center w-full sm:w-max bg-gray-50 border border-gray-100 rounded-[1.5rem] p-1.5 shadow-inner">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    className="flex-1 sm:flex-none p-4 hover:bg-white text-gray-900 rounded-[1.2rem] transition-all shadow-sm hover:shadow-md active:scale-90"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <span className="w-16 text-center text-xl font-black text-gray-900 select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="flex-1 sm:flex-none p-4 hover:bg-white text-gray-900 rounded-[1.2rem] transition-all shadow-sm hover:shadow-md active:scale-90"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={handleAddToCart} 
                  className="group flex items-center justify-center w-full bg-white border-2 border-black text-black py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-[11px] tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500 active:scale-95"
                >
                  <ShoppingCart size={18} className="mr-3 group-hover:-translate-y-1 transition-transform" /> 
                  ADD TO CART
                </button>
                <button 
                  onClick={() => setIsBuyNowOpen(true)} 
                  className="group flex items-center justify-center w-full bg-emerald-600 text-white py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-[11px] tracking-[0.2em] hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 transition-all duration-500 active:scale-95"
                >
                  BUY IT NOW 
                  <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Modern Description Section */}
              <div className="pt-10 space-y-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-900 rounded-lg">
                    <Info size={14} className="text-white" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900">
                    Product Description
                  </span>
                </div>
                
                <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed font-medium italic pl-4 border-l-2 border-emerald-500">
                  "{product.description}"
                </p>

                <div className="grid grid-cols-1 gap-3 pl-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Premium {product.category} Series
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Authentic Material & Finish
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Fast Delivery <br/> All Over BD</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">100% Original <br/> Product</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="border-t border-gray-100 pt-16 md:pt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
                <Sparkles size={14} fill="currentColor" />
                <span>Recommendations</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">
                You May Also <span className="text-emerald-600 not-italic">Like</span>
              </h2>
            </div>
            <button 
              onClick={() => navigate('/collection')} 
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all"
            >
              Explore Full Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {relatedProducts.map((item) => (
              <div key={item.id} onClick={() => navigate(`/product/${item.id}`)} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-50 mb-5 shadow-sm border border-transparent transition-all duration-700 group-hover:shadow-2xl group-hover:border-gray-100 group-hover:-translate-y-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-2">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{item.category}</span>
                  <h3 className="font-bold text-gray-800 uppercase text-xs md:text-sm mt-1 truncate tracking-tight">{item.name}</h3>
                  <p className="font-black text-gray-900 text-base md:text-lg mt-1 italic leading-none">৳{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={handleRemove} 
        onQuantityChange={handleQuantityChange}
        onCheckoutClick={() => { setIsCartOpen(false); setIsBuyNowOpen(true); }}
      />
      
      <BuyNowModal 
        isOpen={isBuyNowOpen} 
        onClose={() => setIsBuyNowOpen(false)} 
        items={[{...product, quantity, selectedSize}]} 
      />
      
      <Footer />
    </div>
  );
};

export default ProductsPage;