import { 
  Facebook, Instagram, Mail, Phone, Heart, 
  ArrowUpRight, ShieldCheck, Truck, RotateCcw
} from "lucide-react";
import logo from "../assets/Images/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100 font-sans">
      
      {/* --- 1. TOP FEATURES (Forced Horizontal on Mobile) --- */}
      <div className="bg-[#fcfdfc] border-b border-emerald-50">
        <div className="max-w-[1440px] mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-3 gap-2 md:gap-8">
            <Feature icon={<Truck size={18} className="md:w-6 md:h-6" />} title="Fast Delivery" />
            <Feature icon={<ShieldCheck size={18} className="md:w-6 md:h-6" />} title="Secure Pay" />
            <Feature icon={<RotateCcw size={18} className="md:w-6 md:h-6" />} title="Easy Returns" />
          </div>
        </div>
      </div>

      {/* --- 2. NEWSLETTER & CONTACT (Side by Side on Desktop, Compact on Mobile) --- */}
      <div className="bg-zinc-950 py-8 md:py-14">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12">
            
            {/* Newsletter - Compact */}
            <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
              <h3 className="text-white text-lg md:text-2xl font-bold tracking-tight uppercase italic">Stay Connected</h3>
              <div className="flex max-w-md mx-auto lg:mx-0 gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-[10px] md:text-sm"
                />
                <button className="bg-emerald-500 text-white px-4 py-2.5 rounded-lg font-black text-[9px] tracking-widest hover:bg-emerald-600 transition-all">
                  JOIN
                </button>
              </div>
            </div>

            {/* Support - Compact side by side info */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end space-y-3">
               <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em]">Customer Support</p>
               <div className="flex items-center gap-4">
                  <div className="text-center lg:text-right">
                    <p className="text-white text-sm md:text-2xl font-black tracking-tighter">+880 16458 32896</p>
                  </div>
                  <div className="flex gap-2">
                    <SocialIcon icon={<Facebook size={16} />} />
                    <SocialIcon icon={<Instagram size={16} />} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. MAIN LINKS (Desktop Layout: 4 Columns on Mobile too) --- */}
      <div className="max-w-[1440px] mx-auto px-5 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-7 h-7 rounded-full border border-emerald-50" />
              <h3 className="text-sm md:text-xl text-zinc-900 font-black tracking-tighter uppercase italic">
                FASHION<span className="text-emerald-500">HUB</span>
              </h3>
            </div>
            <p className="text-zinc-500 text-[11px] md:text-[13px] font-medium leading-relaxed max-w-[200px]">
              Timeless pieces for the modern individual. Elevate your aesthetic.
            </p>
          </div>

          {/* Collection */}
          <div className="space-y-4">
            <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-zinc-900 border-b-2 border-emerald-500 w-fit pb-0.5">Shop</h4>
            <ul className="space-y-2">
              <FooterLink label="Men's" />
              <FooterLink label="Women's" />
              <FooterLink label="New In" />
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-zinc-900 border-b-2 border-emerald-500 w-fit pb-0.5">Help</h4>
            <ul className="space-y-2">
              <FooterLink label="Orders" />
              <FooterLink label="Track" />
              <FooterLink label="Policy" />
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-zinc-900 border-b-2 border-emerald-500 w-fit pb-0.5">Office</h4>
            <div className="text-zinc-800 text-[10px] md:text-[13px] font-bold space-y-1.5">
              <p className="flex items-center gap-2"><Phone size={10} className="text-emerald-500"/> +880 16458 32896</p>
              <p className="flex items-center gap-2"><Mail size={10} className="text-emerald-500"/> hello@fashion.com</p>
            </div>
          </div>
        </div>

        {/* --- 4. BOTTOM BAR --- */}
        <div className="mt-10 pt-6 border-t border-zinc-100 flex justify-between items-center px-1">
          <p className="text-zinc-400 text-[7px] md:text-[10px] font-bold tracking-widest uppercase italic">
            © {currentYear} FASHIONHUB.
          </p>
          <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-black text-zinc-900 uppercase">
            MADE BY <span className="text-emerald-600 italic">SANJID</span>
          </div>
          <div className="flex gap-2 filter grayscale opacity-30 text-[7px] font-black uppercase tracking-tighter">
             <span>VISA</span>
             <span>BKASH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* --- Helpers --- */
const Feature = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="w-9 h-9 md:w-14 md:h-14 flex items-center justify-center bg-white border border-emerald-100 rounded-full text-emerald-600 mb-2 transition-all group-hover:bg-emerald-600 group-hover:text-white">
      {icon}
    </div>
    <h4 className="text-[8px] md:text-[13px] font-bold text-zinc-900 uppercase tracking-tighter">{title}</h4>
  </div>
);

const FooterLink = ({ label }) => (
  <li>
    <button className="text-zinc-500 font-bold text-[10px] md:text-[13px] hover:text-emerald-600 transition-all flex items-center gap-1 group">
      {label}
      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-all text-emerald-500" />
    </button>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-emerald-600 transition-all duration-300">
    {icon}
  </a>
);

export default Footer;