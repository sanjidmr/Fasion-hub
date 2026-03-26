import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

const WishlistSidebar = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistItems(stored);
    };
    if (isOpen) loadWishlist();
    
    window.addEventListener("wishlistUpdate", loadWishlist);
    return () => window.removeEventListener("wishlistUpdate", loadWishlist);
  }, [isOpen]);

  const removeItem = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistItems(updated);
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isExist = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (isExist) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose}
      />
      
      {/* Bottom Sheet - Mobile Adaptive Height */}
      <div className={`fixed bottom-0 left-0 right-0 h-[85vh] md:h-[90vh] bg-white z-[1001] rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        
        {/* Handle for Swiping Visual */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-4 mb-1 cursor-pointer" onClick={onClose} />

        <div className="flex flex-col h-full max-w-[1440px] mx-auto overflow-hidden">
          {/* Header - Responsive Padding */}
          <div className="px-6 md:px-12 py-5 md:py-8 flex items-center justify-between border-b border-gray-50">
            <div>
              <h2 className="text-xl md:text-3xl font-[1000] italic uppercase tracking-tighter text-zinc-900 leading-none">
                My <span className="text-emerald-500">Wishlist</span>
              </h2>
              <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                {wishlistItems.length} Favorite Items
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 md:p-3 text-black bg-gray-50 hover:bg-black hover:text-white rounded-full transition-all"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-5 md:px-12 py-6 md:py-10 pb-20">
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group flex gap-4 md:gap-6 bg-gray-50/50 p-3 md:p-5 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 hover:border-emerald-200 transition-all">
                    {/* Image - Responsive Size */}
                    <div className="w-20 h-28 md:w-28 md:h-36 rounded-xl md:rounded-3xl overflow-hidden shrink-0 shadow-sm">
                      <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt={item.name} />
                    </div>

                    <div className="flex flex-col justify-between py-1 w-full">
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1 uppercase text-[11px] md:text-sm tracking-tight">{item.name}</h3>
                        <p className="text-emerald-600 font-[900] text-base md:text-xl mt-0.5">৳{item.price}</p>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 bg-zinc-900 text-white text-[9px] md:text-[10px] font-black py-2.5 md:py-3.5 rounded-xl md:rounded-2xl uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95"
                        >
                          Add To Bag
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2.5 md:p-3.5 bg-red-50 text-red-500 rounded-xl md:rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                        >
                          <Trash2 size={16} className="md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State - Mobile Centered */
              <div className="h-full min-h-[40vh] flex flex-col items-center justify-center text-center px-4">
                <div className="text-5xl md:text-7xl mb-4 md:mb-6 animate-bounce">✨</div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-zinc-900">
                  Wishlist is <span className="text-red-500">Empty</span>
                </h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em] mt-2 max-w-[200px] md:max-w-xs leading-relaxed">
                  Start adding your favorites to see them here!
                </p>
                <button 
                  onClick={onClose}
                  className="mt-6 md:mt-8 px-8 md:px-12 py-3.5 md:py-4 bg-zinc-900 text-white text-[10px] md:text-[11px] font-black rounded-full uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;