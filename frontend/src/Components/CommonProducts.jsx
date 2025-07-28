// src/Components/CommonProducts.jsx
import { Link } from "react-router-dom";

const commonProducts = [
  {
    name: "Bacon",
    image: "/images/bacon.jpg",
  },
  {
    name: "Sausages",
    image: "/images/sausages.jpg",
  },
  {
    name: "Smokies",
    image: "/images/smokies.jpg",
  },
  {
    name: "Delicatessen",
    image: "/images/delicatessen.jpg",
  },
  {
    name: "Beef",
    image: "/images/beef.jpg",
  },
  {
    name: "Pork",
    image: "/images/pork.jpg",
  },
];

export default function CommonProducts() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Categories</h2>
        <p className="text-gray-500 mt-1">Explore our best-selling meat types</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {commonProducts.map((product, index) => (
          <Link
            to="/products"
            key={index}
            className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#A31621] transition-colors duration-200">
                {product.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
