import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
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

  // Fix: Related products filter safe for string or array categories
  const relatedProducts = products
    .filter((p) => {
      if (p.id === product?.id) return false;
      const prodCat = Array.isArray(p.category) ? p.category : [p.category];
      const currentCat = Array.isArray(product.category) ? product.category : [product.category];
      return prodCat.some(c => currentCat.includes(c));
    })
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

      <div className="max-w-[1440px] mx-auto px-3 md:px-12 pt-4 md:pt-10 pb-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[8px] md:text-xs text-gray-400 mb-4 font-black uppercase tracking-widest overflow-hidden whitespace-nowrap">
          <span className="hover:text-black cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <ChevronRight size={8} />
          <span className="text-black truncate max-w-[100px]">{product.name}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-16 mb-12">
          <div className="md:col-span-7">
            <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl md:rounded-[4rem] bg-gray-50 border border-gray-100 shadow-sm md:shadow-2xl">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="space-y-3 md:space-y-8">
              <div>
                <span className="inline-flex items-center gap-1 text-[7px] md:text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase mb-1 md:mb-4 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Sparkles size={8} fill="currentColor" /> PREMIUM
                </span>
                <h1 className="text-lg md:text-5xl lg:text-6xl font-black text-gray-900 mb-1 md:mb-6 uppercase italic leading-[1] tracking-tighter">{product.name}</h1>
                <div className="flex items-center gap-2 md:gap-6">
                  <span className="text-base md:text-4xl font-black text-gray-900">৳{product.price}</span>
                  <span className="text-[10px] md:text-xl text-gray-300 line-through font-bold">৳{product.price + 1000}</span>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Size</span>
                <div className="flex flex-wrap gap-1.5 md:gap-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-8 h-8 md:w-16 md:h-16 rounded-lg md:rounded-2xl border font-black text-[10px] md:text-base transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-100 text-gray-400'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 md:space-y-4 pt-2">
                <button onClick={handleAddToCart} className="w-full bg-white border border-black text-black py-2.5 md:py-6 rounded-xl md:rounded-[2rem] font-black text-[9px] md:text-[11px] tracking-widest flex items-center justify-center gap-2">
                  <ShoppingCart size={14} className="md:w-5 md:h-5" /> ADD TO CART
                </button>
                <button onClick={() => setIsBuyNowOpen(true)} className="w-full bg-emerald-600 text-white py-2.5 md:py-6 rounded-xl md:rounded-[2rem] font-black text-[9px] md:text-[11px] tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20">
                  BUY NOW <ArrowRight size={14} className="md:w-5 md:h-5" />
                </button>
              </div>

              {/* Trust Section */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                  <Truck size={12} className="text-emerald-500" />
                  <span className="text-[7px] md:text-[10px] font-bold text-gray-500 uppercase">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span className="text-[7px] md:text-[10px] font-bold text-gray-500 uppercase">100% Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Horizontal Grid */}
        <section className="border-t border-gray-100 pt-10 md:pt-20">
          <div className="flex justify-between items-end mb-6 md:mb-12 px-1">
            <h2 className="text-xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter">
              Related <span className="text-emerald-600">Items</span>
            </h2>
            <button
              onClick={() => navigate('/collection')}
              className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 hover:text-black border-b border-gray-200"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-3 md:gap-6 min-w-max">
              {relatedProducts.map((item) => (
                <div key={item.id} onClick={() => navigate(`/product/${item.id}`)} className="group cursor-pointer w-40 md:w-52 flex-shrink-0">
                  <div className="relative aspect-[3/4] rounded-2xl md:rounded-[3rem] overflow-hidden bg-gray-50 mb-3 shadow-sm border border-transparent transition-all group-hover:shadow-xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="px-1">
                    <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">{Array.isArray(item.category) ? item.category[0] : item.category}</span>
                    <h3 className="font-bold text-gray-800 uppercase text-[10px] md:text-sm truncate mt-0.5">{item.name}</h3>
                    <p className="font-black text-gray-900 text-xs md:text-lg mt-0.5 italic">৳{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Components */}
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
        cartItems={[{
          ...product,
          quantity: quantity,
          selectedSize: selectedSize,
          totalPrice: product.price * quantity  // ✅ add this
        }]}
      />
      <Footer />
    </div>
  );
};

export default ProductsPage; 