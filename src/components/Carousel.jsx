import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, Sparkles, Percent, Star, Zap } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import p1 from "../assets/Images/p1.jpg";
import s1 from "../assets/Images/s1.jpg";
import d1 from "../assets/Images/d1.jpg";
import w1 from "../assets/Images/w1.jpg";
import s5 from "../assets/Images/s5.jpg";
import pn5 from "../assets/Images/pn5.jpg";



const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "ELEVATE YOUR",
    subtitle: "STYLISH VIBE",
    desc: "Premium and comfort-driven collection.",
    tag: "Summer 2026",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    title: "LUXURY IN",
    subtitle: "EVERY DETAIL",
    desc: "The perfect fusion of elegance and comfort.",
    tag: "New Arrivals",
  }
];

const Carousel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      {/* --- Main Hero Carousel --- */}
      <div className="relative w-full h-[350px] sm:h-[600px] md:h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          speed={1200}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
          loop={true}
          className="h-full w-full"
        >
          {carouselData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10"></div>
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-20 h-full flex items-center px-6 md:px-16">
                  <div className="max-w-2xl space-y-2 md:space-y-6">
                    <div className="inline-flex items-center gap-1 bg-green-600 px-2 py-0.5 md:px-4 md:py-2 rounded-full text-[8px] md:text-xs font-bold text-white uppercase tracking-widest">
                      <Sparkles size={10} /> {slide.tag}
                    </div>
                    <h1 className="text-white text-3xl md:text-8xl font-black leading-none tracking-tighter uppercase">
                      {slide.title} <br />
                      <span className="text-emerald-400">{slide.subtitle}</span>
                    </h1>
                    <p className="text-gray-300 text-[10px] md:text-xl max-w-[200px] md:max-w-md">{slide.desc}</p>
                    <button onClick={() => navigate('/Collection')} className="bg-white text-black px-4 py-2 md:px-8 md:py-4 rounded-lg font-bold text-[10px] md:text-sm flex items-center gap-2 uppercase tracking-tighter">
                      Shop Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="custom-swiper-pagination absolute bottom-4 !left-1/2 !-translate-x-1/2 z-30 flex gap-1"></div>
        </Swiper>
      </div>

      {/* --- Zig-Zag Banners Section (Maintained 60/40 on all screens) --- */}
      <div className="w-full px-2 md:px-12 py-6 md:py-20 space-y-4 md:space-y-10">

        {/* ROW 1: 60% Left | 40% Right */}
        <div className="flex flex-row gap-2 md:gap-6 h-[180px] sm:h-[300px] md:h-[500px]">
          {/* 60% Banner */}
          <div className="w-[60%] relative group overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-zinc-900 shadow-xl">
            <img src={s5} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-4 md:p-12 z-20">
              <h3 className="text-lg md:text-4xl font-black text-white uppercase leading-none">Summer <br /> <span className="text-emerald-400">OFFERS</span></h3>
              <p className="text-gray-300 mt-2 text-[7px] md:text-sm font-medium uppercase tracking-tighter">Flat 30% Off</p>
            </div>
          </div>

          {/* 40% Banner */}
          <div className="w-[40%] relative group overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-black shadow-xl">
            {/* Opacity-60 remove kora hoyeche jate HD image-ti thikmoto dekha jay */}
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Hot Deals"
            />

            {/* Image-er upore halka dark gradient dewa hoyeche jate text gulo porha jay kintu image-er color change na hoy */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

            <div className="absolute inset-0 p-4 flex flex-col justify-between z-20 text-white">
              <Percent size={20} className="md:size-10 text-white opacity-80" />
              <div>
                <h4 className="text-sm md:text-4xl font-black leading-none drop-shadow-lg">
                  HOT<br />DEALS
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: 40% Left | 60% Right (Swapped to maintain Zig-Zag feel) */}
        <div className="flex flex-row gap-2 md:gap-6 h-[180px] sm:h-[300px] md:h-[500px]">
          {/* 40% Banner */}
          <div className="w-[40%] relative group overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-zinc-900 shadow-xl">
            <img src={w1} className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div className="absolute bottom-4 left-4 z-20 text-white">
              <Star size={18} className="text-emerald-500 mb-1 md:size-8" />
              <h4 className="text-[10px] md:text-3xl font-black uppercase">Premium</h4>
            </div>
          </div>

          {/* 60% Banner */}
          <div className="w-[60%] relative group overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-zinc-100 shadow-xl">
            <img src={pn5} className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent"></div>
            <div className="absolute inset-y-0 right-0 flex flex-col justify-center items-end p-4 md:p-12 z-20 text-right">
              <h3 className="text-lg md:text-4xl font-black text-white uppercase leading-none">SUMMER <br /> <span className="text-emerald-400">COLLECTION</span></h3>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet { background: white !important; width: 6px; height: 2px; opacity: 0.5; transition: all 0.3s ease; }
        .custom-swiper-pagination .swiper-pagination-bullet-active { background: #10b981 !important; width: 15px; opacity: 1; }
      `}</style>
    </div>
  );
};

export default Carousel;