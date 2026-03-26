import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MapPin, Phone, User } from "lucide-react";

const BuyNowModal = ({ isOpen, onClose, cartItems = [] }) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Price Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const deliveryCharge = 60;
  const totalAmount = subtotal + deliveryCharge;

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Dark Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="modal-body"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="relative bg-white w-full max-w-5xl h-[94vh] sm:h-auto sm:max-h-[90vh] rounded-t-[2rem] sm:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-[100000] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 bg-gray-100 hover:bg-gray-200 text-black rounded-full z-[100001] transition-all"
            >
              <X size={20} />
            </button>

            {/* Left: Checkout Form */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">Checkout</h2>
                <p className="text-gray-500 font-medium">Complete your premium order</p>
              </div>

              <form
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setIsOrdering(true); 
                  setTimeout(() => setIsSuccess(true), 2000); 
                }}
                className="space-y-6 pb-24 md:pb-0"
              >
                {/* User Info Fields */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-400 focus:border-black outline-none transition-all font-semibold" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Division" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-4 px-4 text-black placeholder-gray-400 focus:border-black outline-none transition-all font-semibold" />
                    <input required type="text" placeholder="District" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-4 px-4 text-black placeholder-gray-400 focus:border-black outline-none transition-all font-semibold" />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input required type="text" placeholder="Detail Address (Area/Road/House)" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-400 focus:border-black outline-none transition-all font-semibold" />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input required type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-400 focus:border-black outline-none transition-all font-semibold" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isOrdering}
                  className="hidden md:block w-full bg-black text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-300"
                >
                  {isOrdering ? "Processing..." : "Confirm Order"}
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full md:w-[380px] bg-gray-50 p-6 md:p-10 border-t md:border-t-0 md:border-l border-gray-100">
              <h3 className="text-xl font-bold text-black mb-6">Your Order</h3>

              <div className="space-y-4 max-h-[150px] md:max-h-[300px] overflow-y-auto mb-6">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity || 1}</p>
                        {item.selectedSize && <p className="text-[10px] text-gray-400">Size: {item.selectedSize}</p>}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-black">৳{item.price * (item.quantity || 1)}</p>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-3 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between text-gray-500 font-bold text-xs uppercase">
                  <span>Subtotal</span>
                  <span className="text-black italic">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold text-xs uppercase">
                  <span>Delivery</span>
                  <span className="text-black italic">৳{deliveryCharge}</span>
                </div>
                <div className="h-[1px] bg-gray-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-black uppercase">Total</span>
                  <span className="text-2xl font-black text-green-600 tracking-tighter">৳{totalAmount}</span>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="fixed md:static bottom-0 left-0 right-0 bg-white p-4 md:p-0 md:mt-8 border-t md:border-none flex items-center gap-4">
                <div className="md:hidden">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Total Payable</p>
                  <p className="text-xl font-black text-black">৳{totalAmount}</p>
                </div>
                <button
                  onClick={() => !isOrdering && document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}))}
                  className="flex-1 bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-900 active:scale-95 transition-all"
                >
                  {isOrdering ? "Wait..." : "Place Order"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Success Message
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 rounded-[2.5rem] w-full max-w-sm text-center mx-4 shadow-2xl z-[100002]"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-black text-black uppercase">Order Placed!</h2>
            <p className="text-gray-500 mt-2 font-medium">Thank you for your purchase.</p>
            <button
              onClick={onClose}
              className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest"
            >
              Back to Store
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyNowModal;