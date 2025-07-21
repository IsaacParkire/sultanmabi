// src/Components/FarmersChoice.jsx
import { useContext, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const products = [
  // Sample subset, can expand to 15+
  { id: 101, name: "Boerewors – Beef 500g", image: "/images/boerewors_beef.jpg", price: 580 },
  { id: 102, name: "Classic Pork Sausages 500g", image: "/images/classic_pork_sausage.jpg", price: 330 },
  { id: 103, name: "Low Fat Pork Sausage 400g", image: "/images/lowfat_sausage.jpg", price: 355 },
  { id: 104, name: "German Sausages 400g", image: "/images/german_sausage.jpg", price: 281 },
  { id: 105, name: "Baby Boers – Beef 500g", image: "/images/baby_boers.jpg", price: 520.5 },
  // … add more up to 15+
];

export default function FarmersChoice() {
  const { addToCart } = useContext(CartContext);
  const scrollRef = useRef(null);
  const [qty, setQty] = useState({});
  const [clicked, setClicked] = useState(null);

  const scroll = dir => {
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  };

  const incQty = p => {
    setQty(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    addToCart({ ...p, quantity: 1 });
  };
  const decQty = p => {
    setQty(c => {
      const n = (c[p.id] || 1) - 1;
      if (n <= 0) {
        const copy = { ...c }; delete copy[p.id];
        return copy;
      }
      addToCart({ ...p, quantity: n });
      return { ...c, [p.id]: n };
    });
  };

  const onAdd = p => {
    setClicked(p.id);
    incQty(p);
    setTimeout(() => setClicked(null), 300);
  };

  return (
    <section className="py-12 bg-snow relative font-sans">
      <h2 className="text-3xl font-bold text-center text-madder mb-6">Farmers Choice Sausages</h2>
      <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-madder/10">
        <ChevronLeft className="text-madder w-6 h-6"/>
      </button>
      <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-madder/10">
        <ChevronRight className="text-madder w-6 h-6"/>
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-8 scrollbar-hide">
        {products.map((p, i) => (
          <motion.div key={p.id} className="min-w-[180px] bg-white rounded-lg shadow-artcaffe-md p-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ delay: i * 0.05 }}>
            <img src={p.image} alt={p.name} className="h-36 w-full object-cover rounded-md"/>
            <h3 className="mt-2 font-semibold text-gray-800">{p.name}</h3>
            <p className="text-madder font-bold">KSh {p.price}</p>

            {!qty[p.id] ? (
              <motion.button onClick={() => onAdd(p)}
                className="mt-3 px-3 py-1 bg-madder-dark text-white rounded flex items-center justify-center gap-1"
                animate={clicked === p.id ? { scale: [1, 1.2, 1] } : {}}>
                <ShoppingCart className="w-4 h-4"/> Add
              </motion.button>
            ) : (
              <div className="flex justify-center items-center gap-2 mt-3">
                <button onClick={() => decQty(p)} className="px-2 py-1 bg-madder text-white rounded">–</button>
                <span className="font-bold">{qty[p.id]}</span>
                <button onClick={() => incQty(p)} className="px-2 py-1 bg-madder text-white rounded">+</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
