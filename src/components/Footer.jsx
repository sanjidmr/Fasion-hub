import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart, ArrowUpRight } from "lucide-react";
import logo from "../assets/Images/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fdfdfd] border-t border-zinc-100 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-9 h-9 rounded-full grayscale hover:grayscale-0 transition-all duration-500 border border-zinc-100 p-0.5" />
              <h3 className="text-xl text-zinc-900 font-bold tracking-tighter uppercase italic">
                FASHION<span className="text-emerald-500">HUB</span>
              </h3>
            </div>
            <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-xs">
              Curating a collection of timeless pieces designed for the modern individual. Elevate your aesthetic with our premium essentials.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Instagram size={16} />} href="#" />
              <SocialIcon icon={<Facebook size={16} />} href="#" />
              <SocialIcon icon={<Twitter size={16} />} href="#" />
              <SocialIcon icon={<Youtube size={16} />} href="#" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-900 mb-8">Collection</h4>
            <ul className="space-y-4">
              <FooterLink label="New Arrivals" />
              <FooterLink label="Menswear" />
              <FooterLink label="Womenswear" />
              <FooterLink label="Essentials" />
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-900 mb-8">Assistance</h4>
            <ul className="space-y-4">
              <FooterLink label="Order Status" />
              <FooterLink label="Returns" />
              <FooterLink label="Shipping" />
              <FooterLink label="Journal" />
            </ul>
          </div>

          {/* Contact Info (Minimalist) */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-900 mb-8">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-default">
                <div className="text-zinc-300 group-hover:text-emerald-500 transition-colors mt-1">
                   <Mail size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-sm font-light text-zinc-600">hello@fashionhub.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <div className="text-zinc-300 group-hover:text-emerald-500 transition-colors mt-1">
                   <Phone size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest mb-1">Inquiries</p>
                  <p className="text-sm font-light text-zinc-600">+880 1700 000000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-zinc-400 text-[11px] font-light tracking-wide">
              © {currentYear} FASHIONHUB STUDIO. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-[10px] font-medium text-zinc-400 hover:text-zinc-900 transition-colors tracking-tighter uppercase">Privacy</button>
              <button className="text-[10px] font-medium text-zinc-400 hover:text-zinc-900 transition-colors tracking-tighter uppercase">Terms</button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-300">
            MADE WITH <Heart size={12} className="text-red-400/50 fill-red-400/20" /> IN BANGLADESH
          </div>

          {/* Minimalist Payment Icons Placeholder */}
          <div className="flex gap-3 opacity-20 hover:opacity-50 transition-opacity">
            <div className="h-4 w-7 border border-zinc-400 rounded-sm"></div>
            <div className="h-4 w-7 border border-zinc-400 rounded-sm"></div>
            <div className="h-4 w-7 border border-zinc-400 rounded-sm"></div>
          </div>

        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label }) => (
  <li>
    <button className="text-zinc-500 font-light text-sm hover:text-zinc-900 transition-all duration-300 flex items-center gap-1 group">
      {label}
      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
    </button>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;