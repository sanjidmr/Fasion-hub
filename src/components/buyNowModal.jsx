import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Truck, User, Phone, MapPin } from "lucide-react";

const BuyNowModal = ({ isOpen, onClose, cartItems, subtotal }) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isSuccess ? null : onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-[500px] max-h-[90vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border border-gray-100 flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-800 rounded-full transition-all duration-300 z-20"
            >
              <X size={18} />
            </button>
            <div className="overflow-y-auto custom-scrollbar">
              <form onSubmit={handleConfirmOrder} className="p-6 sm:p-8 md:p-10">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900">
                    Checkout
                  </h2>
                  <p className="text-[10px] md:text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1 italic">
                    Complete your premium order
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:ring-2 focus:ring-black focus:bg-white transition-all font-semibold text-sm outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="Delivery Address"
                      className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:ring-2 focus:ring-black focus:bg-white transition-all font-semibold text-sm outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={16} />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:ring-2 focus:ring-black focus:bg-white transition-all font-semibold text-sm outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-center bg-zinc-900 text-white rounded-xl md:rounded-2xl px-4 py-3.5 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg">
                      <Truck size={14} className="mr-2 text-green-400" /> Cash on Delivery
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 p-5 md:p-6 bg-zinc-50 rounded-[1.5rem] md:rounded-[2rem] border border-zinc-200">
                  <div className="flex justify-between items-center mb-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <span>Total Selected Items</span>
                    <span className="text-zinc-900">{cartItems?.length || 0}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-200 w-full my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-black uppercase tracking-tighter text-zinc-800">Total Payable</span>
                    <span className="text-xl md:text-2xl font-black text-green-700">৳{subtotal}</span>
                  </div>
                </div>

                <button
                  disabled={isOrdering}
                  type="submit"
                  className="w-full mt-6 md:mt-8 bg-zinc-900 hover:bg-green-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 shadow-xl disabled:bg-zinc-400 active:scale-95"
                >
                  {isOrdering ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Confirm Order Now"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white w-full max-w-[400px] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 text-center shadow-2xl z-10 border border-zinc-100"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={48} md:size={56} strokeWidth={2.5} />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900">Order Placed!</h2>
              <p className="text-zinc-500 text-xs md:text-sm font-bold mt-3 leading-relaxed">
                Thank you for choosing FashionHub. <br className="hidden sm:block"/> Your style is on its way!
              </p>
              
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-zinc-100 w-full">
                <div className="bg-zinc-50 py-2 px-4 rounded-full inline-block mb-6">
                  <p className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                    Order ID: <span className="text-zinc-900">#FH-{Math.floor(Math.random() * 9000) + 1000}</span>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Return to Store
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyNowModal;