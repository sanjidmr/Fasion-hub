import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "ELEVATE YOUR",
    subtitle: "STYLISH VIBE",
    desc: "Welcome to Fashion Hub. Elevate your personality with our premium and comfort-driven collection.",
    tag: "Summer 2026",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    title: "LUXURY IN",
    subtitle: "EVERY DETAIL",
    desc: "Experience the perfect fusion of elegance and ultimate comfort with our high-end premium selection.",
    tag: "New Arrivals",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    title: "MODERN",
    subtitle: "ESSENTIALS",
    desc: "Redefine your daily fashion with a touch of modern sophistication. Explore our latest limited drops.",
    tag: "Limited Edition",
  }
];

const Carousel = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] md:h-[800px] lg:h-screen overflow-hidden group/carousel">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true, 
          dynamicBullets: true,
          el: '.custom-swiper-pagination'
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={true}
        className="h-full w-full"
      >
        {carouselData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 md:hidden"></div>
              
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="absolute inset-0 w-full h-full object-cover transform scale-105"
              />

              <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6 sm:px-10 lg:px-16">
                <div className="max-w-3xl space-y-4 md:space-y-8">
                  
                  {/* Tag */}
                  <div className="inline-flex items-center gap-2 bg-green-600 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-white shadow-lg animate-fade-in">
                    <Sparkles size={14} className="hidden sm:block" />
                    {slide.tag}
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <h2 className="text-white/80 text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase leading-tight">
                      {slide.title}
                    </h2>
                    <h1 className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        {slide.subtitle}
                      </span>
                    </h1>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base md:text-xl font-medium max-w-md md:max-w-lg leading-relaxed line-clamp-3 md:line-clamp-none">
                    {slide.desc}
                  </p>

                  <div className="pt-2 md:pt-4">
                    <button 
                      onClick={() => navigate('/Collection')}
                      className="bg-white text-black px-6 py-3.5 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-[11px] md:text-sm tracking-widest flex items-center gap-3 hover:bg-green-600 hover:text-white transition-all duration-500 shadow-2xl active:scale-95 group/btn"
                    >
                      SHOP COLLECTION 
                      <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 lg:bottom-20 lg:right-20 z-20 hidden md:block opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="w-32 h-32 lg:w-40 lg:h-40 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 border-t-2 border-green-500 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-[8px] lg:text-[10px] font-bold tracking-[0.3em] uppercase rotate-90">Fashion2026</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 flex-col gap-4">
           <button className="swiper-button-prev-custom w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-sm">
             <ArrowRight size={20} className="rotate-180" />
           </button>
        </div>
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 flex-col gap-4">
           <button className="swiper-button-next-custom w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-sm">
             <ArrowRight size={20} />
           </button>
        </div>

        <div className="custom-swiper-pagination absolute bottom-6 !left-1/2 !-translate-x-1/2 z-30 flex justify-center gap-2"></div>
      </Swiper>

      <style jsx global>{`
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .custom-swiper-pagination .swiper-pagination-bullet { 
          background: white !important; 
          opacity: 0.5; 
          width: 12px; 
          height: 4px; 
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active { 
          background: #16a34a !important; 
          width: 30px; 
          opacity: 1;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Carousel;