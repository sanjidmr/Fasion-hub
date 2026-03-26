import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  // --- Wishlist Logic ---
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Button click korle jeno product detail-e na chole jay
    
    // LocalStorage theke ager data ana
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    // Product-ti agei wishlist-e ache kina check kora
    const isExist = currentWishlist.find((item) => item.id === product.id);

    if (!isExist) {
      const updatedWishlist = [...currentWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      
      // Wishlist sidebar-ke update janano (Custom Event)
      window.dispatchEvent(new Event("wishlistUpdate"));
      
      // Visual feedback hishebe ekti alert ba toast dite paro
      // alert("Added to Wishlist! ❤️");
    } else {
      // Jodi thake tahole remove kore deya (Toggle logic)
      const filtered = currentWishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(filtered));
      window.dispatchEvent(new Event("wishlistUpdate"));
    }
  };

  // Wishlist-e ache kina check kora (Style change korar jonno)
  const isInWishlist = (JSON.parse(localStorage.getItem("wishlist")) || []).some(
    (item) => item.id === product.id
  );

  return (
    <div className="group relative bg-white flex flex-col overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-3xl border border-transparent hover:border-gray-100">
      
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9] rounded-2xl md:rounded-3xl">
        
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              New Arrival
            </span>
          )}
          {product.oldPrice && (
            <span className="bg-emerald-500 text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* --- Heart / Wishlist Button (Updated) --- */}
        <button 
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-20 p-2 backdrop-blur-md rounded-full transition-all duration-300 shadow-sm active:scale-90 ${
            isInWishlist 
            ? "bg-red-500 text-white" 
            : "bg-white/80 text-gray-400 hover:text-red-500 hover:scale-110"
          }`}
        >
          <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          onClick={handleNavigate}
          className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 cursor-pointer"
        />

        {/* --- Desktop Hover Buttons --- */}
        <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 items-end justify-center px-4 pb-6">
          <div className="w-full space-y-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl"
            >
              Add to Cart
            </button>
            <button
              onClick={handleNavigate}
              className="w-full py-3 bg-black/40 backdrop-blur-md text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75 shadow-xl border border-white/20"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden absolute bottom-2 left-2 right-2 flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-white/90 backdrop-blur-md text-black py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
          >
            Add +
          </button>
        </div>
      </div>

      <div className="pt-4 pb-4 px-1 md:px-2 flex flex-col space-y-1.5 md:space-y-2">
        <div className="flex flex-col">
          <span className="text-[9px] md:text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-0.5">
            {product.category || "Lifestyle"}
          </span>
          <h3 
            onClick={handleNavigate}
            className="text-sm md:text-base font-bold text-gray-900 cursor-pointer hover:text-emerald-600 transition-colors line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm md:text-lg font-black text-gray-900">
            ৳{product.price}
          </span>
          {product.oldPrice && (
            <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
              ৳{product.oldPrice}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-900 ring-1 ring-offset-2 ring-zinc-900 transition-transform hover:scale-125 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-400 ring-1 ring-offset-1 ring-transparent hover:ring-zinc-400 transition-transform hover:scale-125 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-200 ring-1 ring-offset-1 ring-transparent hover:ring-emerald-200 transition-transform hover:scale-125 cursor-pointer"></div>
          </div>
          
          <div className="hidden md:block">
             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;