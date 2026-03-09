import React from 'react';
import { 
  User, Shirt, MonitorSmartphone, 
  ShoppingBag, Watch, Footprints 
} from "lucide-react";
import { GiAmpleDress, GiShirt } from "react-icons/gi";
import { BsSunglasses } from "react-icons/bs";
import { PiPantsDuotone } from "react-icons/pi";

const categories = [
  { name: "All", icon: <ShoppingBag size={20} />, value: "All" },
  { name: "Men", icon: <User size={20} />, value: "Men" },
  { name: "Women", icon: <GiAmpleDress size={20} />, value: "Dress" },
  { name: "Shirt", icon: <Shirt size={20} />, value: "Shirt" },
  { name: "Pant", icon: <PiPantsDuotone  size={20} />, value: "Pant" },
  { name: "Panjabi", icon: <GiShirt size={20} />, value: "Panjabi" },
  { name: "Shoes", icon: <Footprints size={20} />, value: "Shoes" },
  { name: "Watch", icon: <Watch size={20} />, value: "Watch" },
  { name: "Accessory", icon: <BsSunglasses size={20} />, value: "Accessory" },
];

const CategorySection = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 uppercase">
            Shop By <span className="text-green-600">Category</span>
          </h2>
          <div className="h-1.5 w-16 md:w-24 bg-green-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex md:flex-wrap items-center md:justify-center gap-4 sm:gap-6 overflow-x-auto pb-8 md:pb-0 no-scrollbar scroll-smooth">
          {categories.map((cat, index) => {
            const isActive = activeCategory === cat.value;
            
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(cat.value)}
                className={`
                  flex flex-col items-center justify-center shrink-0
                  /* Sizing for different screens */
                  min-w-[100px] sm:min-w-[110px] md:min-w-[130px] 
                  h-[110px] sm:h-[120px] md:h-[140px]
                  rounded-[2.5rem] md:rounded-[3rem] 
                  transition-all duration-500 border-2
                  ${isActive
                    ? "bg-black text-white border-black shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] scale-105 -translate-y-2"
                    : "bg-gray-50 text-gray-500 border-transparent hover:bg-white hover:border-green-500 hover:text-green-600 hover:shadow-xl hover:-translate-y-1"
                  }
                `}
              >
                <div className={`
                  p-3 md:p-4 rounded-2xl md:rounded-3xl mb-2 transition-all duration-500
                  ${isActive ? "bg-green-600 shadow-lg" : "bg-white shadow-sm"}
                `}>
                  <div className="scale-90 md:scale-110">
                    {cat.icon}
                  </div>
                </div>

                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest px-2 text-center">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategorySection;