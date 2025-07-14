// src/Components/Categories.jsx

import { motion } from "framer-motion";

const categories = [
  {
    name: "Coffee",
    image: "/images/coffee.jpg",
  },
  {
    name: "Bakery",
    image: "/images/bakery.jpg",
  },
  {
    name: "Meals",
    image: "/images/meals.jpg",
  },
  {
    name: "Pastries",
    image: "/images/pastries.jpg",
  },
  {
    name: "Drinks",
    image: "/images/drinks.jpg",
  },
];

function Categories() {
  return (
    <section id="categories" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Shop by <span className="text-yellow-500">Category</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover"
              />
              <div className="bg-white dark:bg-gray-800 p-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
