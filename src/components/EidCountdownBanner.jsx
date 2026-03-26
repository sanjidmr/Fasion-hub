import React, { useState, useEffect } from "react";
import sb from "../assets/Images/sb.jpg";

const SummerBanner = () => {
  // Fixed Target Date: 30 days countdown
  const [targetDate] = useState(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    let timeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="w-full min-h-[500px] md:min-h-[85vh] bg-[#f9f9f9] flex flex-row items-center overflow-hidden px-4 md:px-16">

      {/* LEFT SIDE: LOMBA IMAGE CONTAINER */}
      <div className="w-[45%] md:w-[45%] h-[350px] md:h-[650px] relative flex items-center justify-center bg-white rounded-[40px] overflow-hidden shadow-sm border border-zinc-100">
        <img
          src={sb}
          alt="Summer Collection Lomba"
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
        />
        {/* Halka overlay jate HD texture thik thake */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      </div>

      {/* RIGHT SIDE: CONTENT */}
      <div className="w-[55%] md:w-[55%] flex flex-col justify-center p-6 md:p-16 lg:p-24">
        
        <div className="max-w-md mx-auto md:mx-0">
          <h4 className="text-green-600 font-bold uppercase text-[8px] md:text-[13px] tracking-[0.5em] mb-3 md:mb-8">
            Exclusive Release
          </h4>

          <h2 className="text-3xl md:text-8xl font-black text-black leading-tight md:leading-[0.85] tracking-tighter mb-6 md:mb-10">
            SUMMER <br className="hidden md:block" /> 
            <span className="font-serif italic font-light text-zinc-400">OFFER</span>
          </h2>

          {/* Minimalist Countdown */}
          <div className="flex gap-4 md:gap-10 mb-8 md:mb-14 items-center border-l-2 border-green-600 pl-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hrs", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start">
                <span className="text-2xl md:text-6xl font-black text-black tabular-nums">
                  {item.value}
                </span>
                <span className="text-[7px] md:text-[10px] uppercase tracking-widest font-bold text-green-600 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <button className="px-6 md:px-14 py-3 md:py-6 bg-black text-white text-[10px] md:text-[13px] font-black rounded-full uppercase tracking-[0.2em] hover:bg-green-700 transition-all shadow-2xl active:scale-95">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default SummerBanner;