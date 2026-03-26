import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Home,
  Info,
  PhoneCall,
  LayoutGrid,
  ChevronDown,
  Heart,
} from "lucide-react";

function Sidebar({ isOpen, onClose, onLoginClick, onWishlistClick }) {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  const categories = [
    { name: "Men", value: "Men" },
    { name: "Women", value: "Dress" },
    { name: "Kids", value: "Kids" },
    { name: "Shoes", value: "Shoes" },
    { name: "Watch", value: "Watch" },
    { name: "Accessory", value: "Accessory" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[1000] transform transition-transform duration-500 shadow-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-white">
          <h2 className="text-lg font-black text-gray-900 tracking-tight italic uppercase">
            FASHION<span className="text-emerald-500">HUB</span>
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
          {/* Home */}
          <button
            onClick={() => handleNav("/")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-800 hover:bg-gray-100 transition"
          >
            <Home size={18} />
            <span className="text-sm font-semibold">Home</span>
          </button>

          {/* All Collection */}
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between p-3 rounded-xl text-gray-800 hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <LayoutGrid size={18} />
              <span className="text-sm font-semibold">All Collection</span>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                showCategories ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Category Dropdown */}
          {showCategories && (
            <div className="pl-8 pb-2 space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    navigate(`/collection?category=${cat.value}`);
                    onClose();
                  }}
                  className="block w-full text-left py-2 text-sm font-medium text-gray-600 hover:text-emerald-600"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Wishlist - Active Link */}
          <button
            onClick={() => {
              onClose(); // Sidebar bondho hobe
              onWishlistClick(); // Wishlist bar open hobe
            }}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-800 hover:bg-red-50 transition"
          >
            <Heart size={18} className="text-red-500" />
            <span className="text-sm font-semibold">My Wishlist</span>
          </button>

          <div className="border-t my-3"></div>

          {/* About */}
          <button
            onClick={() => handleNav("/about")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-800 hover:bg-gray-100 transition"
          >
            <Info size={18} />
            <span className="text-sm font-semibold">About</span>
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNav("/contact")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-800 hover:bg-gray-100 transition"
          >
            <PhoneCall size={18} />
            <span className="text-sm font-semibold">Contact</span>
          </button>
        </div>

        {/* Sign In */}
        <div className="p-5 border-t">
          <button
            onClick={() => {
              onClose();
              onLoginClick();
            }}
            className="w-full py-3 rounded-xl border border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;