import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";


const CartSidebar = ({ 
  isOpen, 
  onClose, 
  items = [], 
  onRemove, 
  onQuantityChange, 
  onCheckoutClick 
}) => {

  const subtotal = items?.length > 0 
    ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0) 
    : 0;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 z-[998] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 md:top-4 right-0 h-full md:h-[calc(100vh-2rem)] w-full sm:w-[420px] bg-white 
        shadow-[-20px_0px_80px_rgba(0,0,0,0.15)] transform transition-all duration-700 
        ease-[cubic-bezier(0.32,0.72,0,1)] z-[999] flex flex-col 
        md:rounded-l-[2.5rem] overflow-hidden border-l border-gray-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 md:p-8 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-gray-50">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-zinc-900 p-2 md:p-2.5 rounded-xl md:rounded-2xl shadow-lg">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter text-gray-900">Your Cart</h2>
              <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                {items?.length || 0} Items Selected
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="flex items-center justify-center bg-gray-50 hover:bg-red-500 text-gray-900 hover:text-white w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-300 shadow-sm group"
          >
            <X size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-4 scrollbar-hide">
          {!items || items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center mb-6 border border-dashed border-gray-200">
                <ShoppingBag size={40} md:size={56} className="text-gray-200" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-gray-800 uppercase italic">Empty Bag</h3>
              <p className="text-xs md:text-sm text-gray-400 max-w-[200px] mx-auto mt-2 font-medium">Your premium selection will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${index}`} 
                  className="flex gap-4 md:gap-5 group animate-in slide-in-from-right-10 duration-500 ease-out"
                >
                  <div className="relative w-20 h-28 md:w-24 md:h-32 flex-shrink-0 overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-gray-50 border border-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                           <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight uppercase tracking-tight line-clamp-1 md:line-clamp-2">{item.name}</h4>
                           <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase mt-1 px-2 py-0.5 bg-gray-50 inline-block rounded-md border border-gray-100">Size: {item.selectedSize || 'N/A'}</p>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)} 
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                      <p className="text-zinc-900 font-black text-base md:text-lg mt-1">৳{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 md:mt-4">
                      <div className="flex items-center bg-zinc-50 rounded-lg md:rounded-xl p-0.5 border border-zinc-200">
                        <button 
                          disabled={item.quantity <= 1}
                          onClick={() => onQuantityChange(item.id, item.selectedSize, item.quantity - 1)} 
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white shadow-sm rounded-md md:rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-zinc-900"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="w-8 md:w-10 text-center text-xs md:text-sm font-black text-zinc-900">{item.quantity}</span>
                        <button 
                          onClick={() => onQuantityChange(item.id, item.selectedSize, item.quantity + 1)} 
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white shadow-sm rounded-md md:rounded-lg transition-all"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items?.length > 0 && (
          <div className="p-6 md:p-8 border-t border-gray-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                <span>Shipping Fee</span>
                <span className="text-emerald-600 font-black">Complimentary</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-black text-lg md:text-xl uppercase tracking-tighter">Subtotal</span>
                <span className="text-2xl md:text-3xl font-black text-gray-900">৳{subtotal}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                onClose();
                onCheckoutClick();
              }} 
              className="group relative w-full bg-zinc-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 overflow-hidden shadow-xl active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                Checkout Now <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </button>
            
            <div className="h-2 md:hidden"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;