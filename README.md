# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



import { useParams, useNavigate } from "react-router-dom";
import { products } from "../components/Products";
import { useState, useEffect } from "react";


const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) return <div className="text-center mt-20 text-xl">Product Not Found</div>;

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCartClick = () => {
    if (!onAddToCart) return; // safeguard
    onAddToCart({ ...product, quantity }); // pass quantity
    navigate("/", { state: { openCart: true } }); // redirect & open sidebar
  };

  return (
    <div className="min-h-screen bg-[#E8EBE4] py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden">
          {/* Left Image */}
          <div className="p-8 bg-gray-100">
            <img src={selectedImage} alt={product.name} className="w-full h-[400px] object-contain rounded-xl transition" />
            <div className="flex gap-4 mt-6">
              {[product.image].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 hover:border-green-600"
                />
              ))}
            </div>
          </div>

          {/* Right Info */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">{product.name}</h2>
              <div className="text-yellow-500 text-lg">
                ★★★★☆ <span className="text-gray-500 text-sm ml-2">(4.0 Reviews)</span>
              </div>
              <p className="text-3xl font-semibold text-green-700">৳{product.price}</p>

              {/* Quantity */}
              <div>
                <h4 className="font-medium mb-2">Quantity</h4>
                <div className="flex items-center border w-fit rounded-lg overflow-hidden">
                  <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="px-5 py-2 bg-gray-200 hover:bg-gray-300">-</button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button onClick={() => setQuantity((prev) => prev + 1)} className="px-5 py-2 bg-gray-200 hover:bg-gray-300">+</button>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={handleAddToCartClick} className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-lg transition">
                Add to Cart
              </button>
              <button onClick={() => setShowModal(true)} className="flex-1 bg-gray-800 hover:bg-black text-white py-3 rounded-xl text-lg transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
         
      </div>
    </div>
  );
};

export default ProductPage;