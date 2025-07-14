// src/Components/CommonProducts.jsx
import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const commonProducts = [
  {
    id: 1,
    name: "Fresh Avocados",
    description: "Hand-picked and organically grown.",
    image: "/images/avocados.jpg",
    price: 150,
  },
  {
    id: 2,
    name: "Premium Beef Cuts",
    description: "Quality meat for your best meals.",
    image: "/images/beef.jpg",
    price: 750,
  },
  {
    id: 3,
    name: "Wholegrain Bread",
    description: "Baked fresh every morning.",
    image: "/images/bread.jpg",
    price: 120,
  },
  {
    id: 4,
    name: "Organic Bananas",
    description: "Sweet and naturally ripened.",
    image: "/images/bananas.jpg",
    price: 100,
  },
  {
    id: 5,
    name: "Almond Milk",
    description: "Healthy dairy alternative.",
    image: "/images/almondmilk.jpg",
    price: 250,
  },
];

export default function CommonProducts() {
  const { addToCart, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const scrollRef = useRef(null);

  const handleAdd = (product) => {
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    addToCart(product, 1);
  };

  const handleIncrement = (product) => {
    setQuantities((prev) => {
      const newQty = (prev[product.id] || 1) + 1;
      addToCart(product, 1);
      return { ...prev, [product.id]: newQty };
    });
  };

  const handleDecrement = (product) => {
    setQuantities((prev) => {
      const newQty = (prev[product.id] || 1) - 1;
      if (newQty <= 0) {
        removeFromCart(product.id);
        const { [product.id]: _, ...rest } = prev;
        return rest;
      }
      removeFromCart(product.id, 1);
      return { ...prev, [product.id]: newQty };
    });
  };

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-100 relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Popular Picks</h2>
        <p className="text-gray-600 mt-2">Favorites our customers keep coming back for</p>
      </div>

      {/* Scroll Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-red-100"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-6 h-6 text-red-600" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-red-100"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-6 h-6 text-red-600" />
      </button>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2"
      >
        {commonProducts.map((product) => {
          const quantity = quantities[product.id] || 0;
          return (
            <div
              key={product.id}
              className="min-w-[250px] bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-red-600 font-semibold mt-2">Ksh {product.price}</p>

                {quantity === 0 ? (
                  <button
                    onClick={() => handleAdd(product)}
                    className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 w-full"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => handleDecrement(product)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      –
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleIncrement(product)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
