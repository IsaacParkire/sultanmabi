// src/Components/CommonProducts.jsx
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    name: "Ham",
    image: "/images/ham.jpg",
  },
];

export default function CommonProducts() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Create duplicated array for seamless looping
  const duplicatedProducts = [...commonProducts, ...commonProducts, ...commonProducts];

  // Check scroll position to update arrow states
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Scroll function with looping
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 280; // Approximate width of each card including gap
    const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Handle infinite scroll looping
    setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const oneSetWidth = commonProducts.length * cardWidth;

      // If scrolled to the end, jump to middle set
      if (scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: oneSetWidth, behavior: 'auto' });
      }
      // If scrolled to the beginning, jump to middle set
      else if (scrollLeft <= 10) {
        container.scrollTo({ left: oneSetWidth, behavior: 'auto' });
      }
      
      updateScrollButtons();
    }, 300);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Categories</h2>
        <p className="text-gray-500 mt-1">Explore our best-selling meat types</p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 ${
            canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 ${
            canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!canScrollRight}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 px-12 py-4"
          onScroll={updateScrollButtons}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <Link
              to="/products"
              key={`${product.name}-${index}`}
              className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out flex-shrink-0 w-64"
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
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
