import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import s8 from "../assets/Images/s8.jpg";
import pn4 from "../assets/Images/pn4.jpg";
import p10 from "../assets/Images/p10.jpg";
import a5 from "../assets/Images/a5.jpg";

const categories = [
  { name: "Men's Wear", value: "Men", imgSrc: "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=764&auto=format&fit=crop" },
  { name: "Women's Collection", value: "Dress", imgSrc: "https://images.unsplash.com/photo-1733310925469-efcb541c7a16?q=80&w=687&auto=format&fit=crop" },
  { name: "Kids Collection", value: "Kids", imgSrc: "https://images.unsplash.com/photo-1767858897602-b4809d429157?q=80&w=687&auto=format&fit=crop" },
  { name: "Casual Shirts", value: "Shirt", imgSrc: s8 },
  { name: "Premium Pants", value: "Pant", imgSrc: pn4 },
  { name: "Traditional Panjabi", value: "Panjabi", imgSrc: p10 },
  { name: "Footwear", value: "Shoes", imgSrc: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" },
  { name: "Luxury Watches", value: "Watch", imgSrc: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=800&q=80" },
  { name: "Accessories", value: "Accessory", imgSrc: a5 },
];

const CategorySection = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  const handleCategoryClick = (val) => {
    navigate(`/collection?category=${val}`);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let slideInterval = setInterval(() => {
      const cardWidth = slider.querySelector('.min-w-[75%]')?.offsetWidth || 0;
      const totalWidth = slider.scrollWidth;
      const nextScrollAmount = scrollAmount + cardWidth + 16; // Add gap to cardWidth

      if (nextScrollAmount >= totalWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
        setScrollAmount(0);
      } else {
        slider.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
        setScrollAmount(nextScrollAmount);
      }
    }, 3000); // Autoplay delay in milliseconds

    return () => clearInterval(slideInterval);
  }, [scrollAmount]);

  return (
    <div className="py-12 md:py-20 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <h2 className="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Featured <span className="text-green-600">Categories</span>
          </h2>
          <div className="h-1 w-16 md:h-1.5 md:w-24 bg-green-600 mt-3 rounded-full"></div>
        </div>

        {/* Categories Container: Mobile - Auto Slide | Desktop - Grid */}
        <div ref={sliderRef} className="flex overflow-x-auto pb-6 gap-4 snap-x md:grid md:grid-cols-3 md:gap-10 md:overflow-visible no-scrollbar">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.value)}
              className="min-w-[75%] sm:min-w-[50%] md:min-w-full snap-center group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* --- Category Name Adjusted (Smaller & Side-aligned) --- */}
              <div className="absolute top-0 left-0 w-full z-20 p-4 md:p-6">
                <div className="bg-green-600 text-white px-3 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl inline-block shadow-lg transform translate-x-1 group-hover:translate-x-3 transition-transform duration-300">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap">
                    {cat.name}
                  </span>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="absolute inset-0 z-0">
                {cat.imgSrc ? (
                  <img 
                    src={cat.imgSrc} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#E8EBE4]">
                    <ShoppingBag className="text-green-800/10" size={60} />
                  </div>
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              {/* Bottom Details */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex justify-between items-center text-white translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold text-green-400 uppercase tracking-[0.2em] mb-1">Premium</p>
                  <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter">Collection</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-2 md:p-3 rounded-full border border-white/30 group-hover:bg-green-600 group-hover:border-green-600 transition-all">
                  <ArrowUpRight size={18} className="text-white md:w-5 md:h-5" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-0 group-hover:border-[6px] md:group-hover:border-[10px] border-green-600/10 transition-all duration-500 rounded-[1.5rem] md:rounded-[2.5rem]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS to hide scrollbar but keep functionality */}
      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CategorySection;