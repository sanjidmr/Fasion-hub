import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion import
import { products } from "./Products"; 

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = products.filter((p) => {
        const nameMatch = p.name 
          ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) 
          : false;
        const categoryMatch = (p.category && typeof p.category === 'string') 
          ? p.category.toLowerCase().includes(searchTerm.toLowerCase()) 
          : false;
        return nameMatch || categoryMatch;
      });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
    onClose();
    setSearchTerm("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center">
          
          {/* Background Overlay - Smooth Fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search Container - Smooth Slide Down */}
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[1200px] bg-white shadow-2xl rounded-b-[20px] md:rounded-b-[40px] z-10 overflow-hidden h-[90vh] md:h-[80vh] flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 md:right-8 md:top-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
            >
              <X size={24} className="text-gray-400" />
            </button>

            <div className="flex-1 flex flex-col px-4 md:px-16 py-10 md:py-12 overflow-hidden">
              
              {/* Input Section */}
              <div className="max-w-[600px] w-full mx-auto mb-8">
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] font-black tracking-[0.4em] text-emerald-600 uppercase mb-4 text-center"
                >
                  Premium Search
                </motion.p>
                <div className="relative group">
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for clothes, watches..."
                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-5 py-4 text-sm md:text-base font-bold outline-none focus:border-emerald-500 transition-all placeholder:text-gray-300 text-zinc-800 rounded-t-xl"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                </div>
              </div>

              {/* Results Area */}
              <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                {searchTerm.length > 0 ? (
                  <div className="max-w-[1000px] mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                        Results Found ({results.length})
                      </h3>
                    </div>

                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((product, idx) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleProductClick(product)}
                            className="group flex items-center gap-4 p-3 border border-gray-50 rounded-2xl hover:bg-emerald-50/50 hover:border-emerald-100 cursor-pointer transition-all duration-300"
                          >
                            <div className="h-20 w-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 shadow-sm">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <h4 className="font-bold text-[13px] text-zinc-800 truncate group-hover:text-emerald-700 transition-colors">
                                {product.name}
                              </h4>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[14px] font-black text-emerald-600">৳{product.price}</span>
                                <div className="bg-emerald-500 p-1.5 rounded-full opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                  <ArrowRight size={14} className="text-white" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search size={30} className="text-gray-200" />
                        </div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">We couldn't find any matches</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Quick Suggestions */
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[600px] mx-auto text-center mt-12"
                  >
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Trending Searches</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['Panjabi', 'Casual Shirt', 'Watch', 'Sneakers', 'Pants'].map((tag, idx) => (
                        <motion.button 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          key={tag}
                          onClick={() => setSearchTerm(tag)}
                          className="px-6 py-2 rounded-full border border-gray-100 text-[11px] font-bold text-gray-500 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300"
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;