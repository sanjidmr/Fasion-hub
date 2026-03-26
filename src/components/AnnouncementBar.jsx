import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Sparkles, Truck, Tag } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  const announcements = [
    {
      text: "Get 20% OFF on your first order!",
      code: "FASHION20",
      icon: <Tag size={16} className="mr-2" />,
    },
    {
      text: "Free Shipping on orders over ৳1999",
      code: null,
      icon: <Truck size={16} className="mr-2" />,
    },
    {
      text: "New Spring Collection is LIVE ✨",
      code: null,
      icon: <Sparkles size={16} className="mr-2" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#E8EBE4] border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Spacer for centering on desktop */}
          <div className="hidden sm:block w-10"></div>

          {/* Main Content Area */}
          <div className="flex-1 flex justify-center items-center text-sm sm:text-base font-medium text-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center text-center cursor-pointer group"
              >
                <span className="text-gray-600">{announcements[index].icon}</span>
                <p>
                  {announcements[index].text}
                  {announcements[index].code && (
                    <span className="ml-2 font-bold text-black bg-white px-2 py-0.5 rounded-full text-xs shadow-sm border border-gray-100">
                      {announcements[index].code}
                    </span>
                  )}
                </p>
                <ChevronRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;