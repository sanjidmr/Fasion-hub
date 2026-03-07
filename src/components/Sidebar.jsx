import { useNavigate } from "react-router-dom";
import { 
  X, Home, LayoutGrid, Shirt, Info, PhoneCall, 
  Instagram, Facebook, Twitter, LogOut, User 
} from "lucide-react"; 

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    // Tomar logout logic ekhane thakbe (e.g., clearing tokens)
    console.log("Logged out");
    onClose();
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Shop Collection", path: "/Collection", icon: <Shirt size={20} /> },
    { name: "About Us", path: "/about", icon: <Info size={20} /> },
    { name: "Contact", path: "/contact", icon: <PhoneCall size={20} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 backdrop-blur-[4px] bg-black/40 transition-all duration-500 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[10px_0_30px_rgba(0,0,0,0.05)] flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between px-8 py-8">
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-black italic">
              FASHION<span className="text-gray-400 font-light text-xl not-italic">HUB</span>
            </h2>
            <div className="h-1 w-8 bg-black mt-1"></div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:rotate-90 transition-transform duration-300 rounded-full hover:bg-gray-100"
          >
            <X size={24} className="text-gray-400 hover:text-black" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNav(item.path)}
              className="w-full flex items-center gap-4 px-4 py-4 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all duration-300 group"
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout & Social Footer Section */}
        <div className="p-4 mx-4 mb-4 border-t border-gray-100">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group mb-4"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">
              Logout
            </span>
          </button>

          {/* Social Icons */}
          <div className="px-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 font-semibold">Connect</p>
            <div className="flex gap-6 text-gray-400">
              <Facebook size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
              <Instagram size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-sky-500 cursor-pointer transition-colors" />
            </div>
            <p className="mt-6 text-[9px] text-gray-300 italic tracking-wider uppercase">© 2026 Fashion Hub Limited</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;