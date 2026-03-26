import p1 from "../assets/Images/p1.jpg";
import p2 from "../assets/Images/p2.jpg";
import p3 from "../assets/Images/p3.jpg";
import p4 from "../assets/Images/p4.jpg";
import p5 from "../assets/Images/p5.jpg";
import p6 from "../assets/Images/p6.jpg";
import p7 from "../assets/Images/p7.jpg";
import p8 from "../assets/Images/p8.jpg";
import p9 from "../assets/Images/p9.jpg";
import p10 from "../assets/Images/p10.jpg";

import s1 from "../assets/Images/s1.jpg";
import s2 from "../assets/Images/s2.jpg";
import s3 from "../assets/Images/s3.jpg";
import s4 from "../assets/Images/s4.jpg";
import s5 from "../assets/Images/s5.jpg";
import s6 from "../assets/Images/s6.jpg";
import s7 from "../assets/Images/s7.jpg";
import s8 from "../assets/Images/s8.jpg";
import s9 from "../assets/Images/s9.jpg";
import s10 from "../assets/Images/s10.jpg";

import pn1 from "../assets/Images/pn1.jpg";
import pn2 from "../assets/Images/pn2.jpg";
import pn3 from "../assets/Images/pn3.jpg";
import pn4 from "../assets/Images/pn4.jpg";
import pn5 from "../assets/Images/pn5.jpg";
import pn6 from "../assets/Images/pn6.jpg";
import pn7 from "../assets/Images/pn7.jpg";
import pn8 from "../assets/Images/pn8.jpg";
import pn9 from "../assets/Images/pn9.jpg";
import pn10 from "../assets/Images/pn10.jpg";

import d1 from "../assets/Images/d1.jpg";

import a1 from "../assets/Images/a1.jpg";
import a2 from "../assets/Images/a2.jpg";
import a3 from "../assets/Images/a3.jpg";
import a4 from "../assets/Images/a4.jpg";
import a5 from "../assets/Images/a5.jpg";
import a6 from "../assets/Images/a6.jpg";
import a7 from "../assets/Images/a7.jpg";

import w1 from "../assets/Images/w1.jpg";

export const products = [

  // ----- SHIRTS -----
  { id:1,name:"Classic White Oxford",category:["men","Shirt"],price:1250,image:s1,description:"Premium breathable cotton shirt." },
  { id:2,name:"Midnight Navy Formal",category:["men","Shirt"],price:1450,image:s2,description:"Slim-fit navy formal shirt." },
  { id:3,name:"Casual Denim Shirt",category:["men","Shirt"],price:1800,image:s3,description:"Soft-wash indigo denim shirt." },
  { id:4,name:"Striped Summer Cotton",category:["men","Shirt"],price:1100,image:s4,description:"Lightweight cotton summer shirt." },
  { id:5,name:"Slim Fit Black Shirt",category:["men","Shirt"],price:1350,image:s5,description:"Elegant slim-fit black shirt." },
  { id:6,name:"Linen Pastel Pink",category:["men","Shirt"],price:1600,image:s6,description:"Soft pastel linen shirt." },
  { id:7,name:"Checks Flannel Shirt",category:["men","Shirt"],price:1550,image:s7,description:"Warm check flannel shirt." },
  { id:8,name:"Cuban Collar Printed",category:["men","Shirt"],price:950,image:s8,description:"Retro printed Cuban collar shirt." },
  { id:9,name:"Khaki Safari Shirt",category:["men","Shirt"],price:1700,image:s9,description:"Utility safari style shirt." },
  { id:10,name:"Formal Micro-Print",category:["men","Shirt"],price:1400,image:s10,description:"Premium micro print formal shirt." },

  // ----- PANTS -----
  { id:11,name:"Classic Blue Denim",category:["men","Pant"],price:2200,image:pn1,description:"Straight cut denim jeans." },
  { id:12,name:"Slim Fit Black Chino",category:["men","Pant"],price:1850,image:pn2,description:"Stretch cotton chinos." },
  { id:13,name:"Grey Formal Trouser",category:["men","Pant"],price:1600,image:pn3,description:"Formal office trousers." },
  { id:14,name:"Beige Cargo Pants",category:["men","Pant"],price:2400,image:pn4,description:"Utility cargo pants." },
  { id:15,name:"Straight Fit Raw Denim",category:["men","Pant"],price:2800,image:pn5,description:"Premium raw denim." },
  { id:16,name:"Khaki Cotton Pant",category:["men","Pant"],price:1500,image:pn6,description:"Comfortable cotton trousers." },
  { id:17,name:"Jet Black Joggers",category:["men","Pant"],price:1200,image:pn7,description:"Athletic fleece joggers." },
  { id:18,name:"Charcoal Wool Pant",category:["men","Pant"],price:3200,image:pn8,description:"Luxury wool formal pant." },
  { id:19,name:"Light Wash Jeans",category:["men","Pant"],price:2100,image:pn9,description:"Vintage style denim." },
  { id:20,name:"Corduroy Brown Pant",category:["men","Pant"],price:2600,image:pn10,description:"Corduroy smart casual pants." },

  // ----- WOMEN DRESS -----
  { id:21,name:"Floral Summer Gown",category:["women","Dress"],price:3500,image:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",description:"Light chiffon floral gown." },
  { id:22,name:"Velvet Party Dress",category:["women","Dress"],price:4200,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8",description:"Luxury velvet party dress." },
  { id:23,name:"Boho Chic Maxi",category:["women","Dress"],price:2800,image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c",description:"Bohemian maxi dress." },
  { id:24,name:"Elegant Satin Slip",category:["women","Dress"],price:3100,image:"https://images.unsplash.com/photo-1495385794356-15371f348c31",description:"Minimal satin slip dress." },
  { id:25,name:"Classic Red Anarkali",category:["women","Dress"],price:5500,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8",description:"Traditional embroidered anarkali." },
  { id:26,name:"Evening Black Gown",category:["women","Dress"],price:6000,image:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",description:"Elegant evening gown." },
  { id:27,name:"Pastel Kurti Set",category:["women","Dress"],price:2200,image:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",description:"Cotton pastel kurti." },
  { id:28,name:"Silk Party Wear",category:["women","Dress"],price:7500,image:"https://images.unsplash.com/photo-1566174053879-31528523f8ae",description:"Premium silk party dress." },
  { id:29,name:"Cotton Casual Frock",category:["women","Dress"],price:1500,image:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",description:"Casual cotton frock." },
  { id:30,name:"Designer Salwar Suit",category:["women","Dress"],price:4800,image:d1,description:"Designer salwar suit." },

  // ----- PANJABI -----
  { id:31,name:"Premium White Panjabi",category:["men","Panjabi"],price:2500,image:p1,description:"Premium cotton panjabi." },
  { id:32,name:"Royal Blue Kabli",category:["men","Panjabi"],price:3200,image:p2,description:"Royal blue kabli panjabi." },
  { id:33,name:"Silk Embroidered Panjabi",category:["men","Panjabi"],price:4500,image:p3,description:"Silk embroidered panjabi." },
  { id:34,name:"Cotton Casual Panjabi",category:["men","Panjabi"],price:1800,image:p4,description:"Casual cotton panjabi." },
  { id:35,name:"Deep Maroon Panjabi",category:["men","Panjabi"],price:2800,image:p5,description:"Maroon festive panjabi." },
  { id:36,name:"Lucknowi Chikankari",category:["men","Panjabi"],price:3800,image:p6,description:"Chikankari embroidery panjabi." },
  { id:37,name:"Yellow Eid Special",category:["men","Panjabi"],price:2600,image:p7,description:"Festive yellow panjabi." },
  { id:38,name:"Black Shadow Work",category:["men","Panjabi"],price:2900,image:p8,description:"Black shadow embroidery." },
  { id:39,name:"Festive Printed Panjabi",category:["men","Panjabi"],price:2100,image:p9,description:"Printed festive panjabi." },
  { id:40,name:"Classic Beige Panjabi",category:["men","Panjabi"],price:2400,image:p10,description:"Classic beige panjabi." },
 { 
    id: 41, 
    name: "Baby Boy Denim Overall", 
    price: 1250, 
    category: "Kids", 
    image: "https://images.unsplash.com/photo-1519457431-757395461372?auto=format&fit=crop&q=80&w=800",
    description: "Durable and stylish denim dungarees for active toddlers."
  },
  { 
    id: 42, 
    name: "Princess Tutu Dress", 
    price: 1850, 
    category: ["kids", "festive"], 
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800",
    description: "Sparkly pink tutu dress perfect for birthdays and parties."
  },
  { 
    id: 43, 
    name: "Cartoon Print T-Shirt", 
    price: 450, 
    category: "kids", 
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=800",
    description: "Soft cotton tee with fun character prints."
  },
  { 
    id: 44, 
    name: "Kids Cotton Pajamas", 
    price: 850, 
    category: "kids", 
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=800",
    description: "Breathable cotton nightwear for a comfortable sleep."
  },
  { 
    id: 45, 
    name: "Toddler Winter Jacket", 
    price: 1600, 
    category: ["kids", "winter"], 
    image: "https://images.unsplash.com/photo-1544126592-807daf21565c?auto=format&fit=crop&q=80&w=800",
    description: "Padded warm jacket to keep your little ones cozy."
  },
  { 
    id: 46, 
    name: "School Backpack Blue", 
    price: 1100, 
    category: "kids", 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    description: "Ergonomic and lightweight backpack for school-going children."
  },
  { 
    id: 47, 
    name: "Striped Kids Polo", 
    price: 650, 
    category: "kids", 
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=800",
    description: "Classic striped polo shirt for a smart casual look."
  },
  { 
    id: 48, 
    name: "Floral Hairband Set", 
    price: 250, 
    category: ["kids", "Accessory"], 
    image: "https://images.unsplash.com/photo-1596462502278-27bfac44221b?auto=format&fit=crop&q=80&w=800",
    description: "Beautiful set of floral headbands for baby girls."
  },
  { 
    id: 49, 
    name: "Kids Canvas Shoes", 
    price: 1400, 
    category: ["kids", "Shoes"], 
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800",
    description: "Comfortable and colorful canvas sneakers for play."
  },
  { 
    id: 50, 
    name: "Cute Teddy Hoodie", 
    price: 1350, 
    category: "kids", 
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800",
    description: "Soft fleece hoodie with cute teddy bear ears."
  },

  

  // --- SHOES (10) ---
  { 
    id: 51, name: "White Street Sneakers", category: "Shoes", price: 3500, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
    description: "Crisp white sneakers with a minimalist urban design. Features cushioned insoles for all-day comfort and a clean, versatile look." 
  },
  { 
    id: 52, name: "Brown Oxford Formal", category: "Shoes", price: 4200, image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=500&q=80",
    description: "Handcrafted leather Oxford shoes with polished finishing. A timeless classic that defines professional elegance and luxury." 
  },
  { 
    id: 53, name: "Sporty Running Shoes", category: "Shoes", price: 2800, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    description: "Aerodynamic design with responsive foam technology. Engineered for peak performance and durability during high-intensity training." 
  },
  { 
    id: 54, name: "Suede Chelsea Boots", category: "Shoes", price: 5500, image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=500&q=80",
    description: "Premium suede leather with a sleek slip-on design. Combines rugged outdoor heritage with a refined city-ready aesthetic." 
  },
  { 
    id: 55, name: "Casual Slip-ons", category: "Shoes", price: 1200, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80",
    description: "Lightweight and breathable slip-on shoes. The perfect choice for quick errands or a relaxed day at the office." 
  },
  { 
    id: 56, name: "Leather Loafers Black", category: "Shoes", price: 3800, image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=500&q=80",
    description: "Sleek black loafers with a modern profile. Features a soft leather lining for a comfortable fit without compromising on style." 
  },
  { 
    id: 57, name: "High-Top Basketball", category: "Shoes", price: 6500, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80",
    description: "Performance-oriented high-tops with superior ankle support. A bold streetwear statement inspired by the court's energy." 
  },
  { 
    id: 58, name: "Summer Beach Sandals", category: "Shoes", price: 950, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=500&q=80",
    description: "Water-resistant, durable sandals with a contoured footbed. Designed for sun, sand, and ultimate vacation relaxation." 
  },
  { 
    id: 59, name: "Hiking Rugged Boots", category: "Shoes", price: 4800, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    description: "Built for tough terrains with high-traction soles. Waterproof and heavy-duty, these boots are your best companion for the outdoors." 
  },
  { 
    id: 60, name: "Knitted Gym Shoes", category: "Shoes", price: 3200, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=500&q=80",
    description: "Breathable knitted upper for a sock-like fit. Offers flexibility and lightweight support for your gym and workout sessions." 
  },

  // --- WATCHES (10) ---
  { 
    id: 61, name: "Classic Silver Analog", category: "Watch", price: 4500, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=500&q=80",
    description: "A polished silver-tone watch with a clean analog dial. Features a stainless steel strap for a timeless, professional appeal." 
  },
  { 
    id: 62, name: "Leather Chronograph", category: "Watch", price: 6200, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
    description: "Functional chronograph features paired with a genuine leather strap. A perfect blend of technical precision and classic style." 
  },
  { 
    id: 63, name: "Smart Fitness Watch", category: "Watch", price: 3500, image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=800&q=80",
    description: "High-resolution display with heart rate and activity tracking. Syncs with your lifestyle to keep you healthy and connected." 
  },
  { 
    id: 64, name: "Gold Plated Luxury", category: "Watch", price: 12500, image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=500&q=80",
    description: "18k gold-plated finish with a sophisticated sunray dial. An iconic statement piece that exudes luxury and high status." 
  },
  { 
    id: 65, name: "Minimalist Mesh Watch", category: "Watch", price: 2800, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-slim profile with an elegant mesh bracelet. A modern, minimalist accessory that adds a subtle touch of class to any outfit." 
  },
  { 
    id: 66, name: "Digital Sports Watch", category: "Watch", price: 1800, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=500&q=80",
    description: "Rugged digital interface with backlight and stopwatch features. Built to withstand shock and water during active adventures." 
  },
  { 
    id: 67, name: "Automatic Open Heart", category: "Watch", price: 15000, image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=500&q=80",
    description: "A mechanical masterpiece with an open-heart dial. Shows the intricate movements of the gears for the true horology enthusiast." 
  },
  { 
    id: 68, name: "Rose Gold Ladies Watch", category: "Watch", price: 5800, image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=500&q=80",
    description: "Elegant rose gold finish with delicate diamond accents. Designed to add a feminine and sophisticated sparkle to your wrist." 
  },
  // ----- WATCH -----
  { id:69,name:"Black Tactical Watch",category:["Accessory","Watch"],price:4200,image:w1,description:"Military style tactical watch." },
 { 
    id: 70, name: "Blue Dial Premium", category: "Watch", price: 8500, image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=500&q=80",
    description: "Striking ocean-blue dial with a premium brushed metal finish. Captures the perfect balance between sporty and sophisticated." 
  },
  // ----- ACCESSORY -----
  { id:71,name:"Leather Wallet",category:["Accessory"],price:1200,image:"https://images.unsplash.com/photo-1627123424574-724758594e93",description:"Genuine leather wallet." },
  { id:72,name:"Polarized Sunglasses",category:["Accessory"],price:1500,image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f",description:"HD polarized sunglasses." },
  { id:73,name:"Brown Leather Belt",category:["Accessory"],price:850,image:"https://images.unsplash.com/photo-1577803645773-f96470509666",description:"Classic leather belt." },
  { id:74,name:"Silver Tie Clip Set",category:["Accessory"],price:600,image:a1,description:"Elegant tie clip." },
  { id:75,name:"Woolen Scarf Grey",category:["Accessory"],price:900,image:a2,description:"Warm winter scarf." },
  { id:76,name:"Cufflinks Premium",category:["Accessory"],price:1100,image:a3,description:"Premium cufflinks." },
  { id:77,name:"Canvas Laptop Bag",category:["Accessory"],price:3500,image:a4,description:"Durable laptop bag." },
  { id:78,name:"Cotton Beanie Cap",category:["Accessory"],price:450,image:a5,description:"Soft cotton beanie." },
  { id:79,name:"Suspender & Bowtie Set",category:["Accessory"],price:1300,image:a6,description:"Vintage bowtie set." },
  { id:80,name:"Leather Travel Pouch",category:["Accessory"],price:1600,image:a7,description:"Premium travel pouch." }

];