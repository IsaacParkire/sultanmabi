// src/Components/CategoryIntros.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CategoryIntros() {
  // Sample products for each category
  const categories = [
    {
      id: "farmers-choice",
      name: "Farmer's Choice",
      description: "Kenya's trusted meat brand since 1970",
      image: "/images/farmer.png",
      bgImage: "/images/meat-background.jpg",
      link: "/farmers-choice",
      theme: "#A31621",
      products: [
        {
          name: "Beef Continental Salami",
          image: "/images/continentals/Beefcontinentalsalami.png",
          price: "KSh 2,400"
        },
        {
          name: "German Bratwurst",
          image: "/images/continentals/BeefViennas500g.png", 
          price: "KSh 1,500"
        },
        {
          name: "FCL Poultry Viennas",
          image: "/images/continentals/FCLPoultryViennas.png",
          price: "KSh 2,200"
        }
      ]
    },
    {
      id: "choice-meats",
      name: "Choice Meats",
      description: "100% Halal certified meats",
      image: "/images/choice.png",
      bgImage: "/images/halal1.jpg",
      link: "/choice-meats",
      theme: "#1a5d1a",
      products: [
        {
          name: "Beef Cubes",
          image: "/images/FCL Fresh cuts/Beefcuts/Beefcubes1.png",
          price: "KSh 1,200"
        },
        {
          name: "Chicken Breast",
          image: "/images/FCLSausagesPacks/ChickenSausages1kg.png",
          price: "KSh 950"
        },
        {
          name: "Beef Strips",
          image: "/images/FCL Fresh cuts/Beefcuts/BeefStrips.png",
          price: "KSh 900"
        }
      ]
    },
    {
      id: "sultanmabi-select",
      name: "Sultanmabi Select",
      description: "Exclusive handpicked collection",
      image: "/images/sultanlogo.jpg",
      bgImage: "/images/meat-background.jpg",
      link: "/sultanmabi-select",
      theme: "#102542",
      products: [
        {
          name: "Bacon",
          image: "/images/FCLBaconPacks/BackBacon1kg.png",
          price: "KSh 850"
        },
        {
          name: "Sausage Variety",
          image: "/images/FCLSausagesPacks/BeefCatering1Kg.png",
          price: "KSh 1,100"
        },
        {
          name: "Beef Steaks",
          image: "/images/FCL Fresh cuts/Beefcuts/Beefcubes1.png",
          price: "KSh 1,800"
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-[#FCF7F8]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#A31621] font-semibold tracking-wide">OUR BRANDS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#102542]">
            Discover Our <span className="text-[#A31621]">Collections</span>
          </h2>
          <p className="text-lg text-[#102542]/80 mt-4 max-w-2xl mx-auto">
            Each brand represents our commitment to quality and excellence
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center mb-4">
                  <img 
                    src={category.image} 
                    alt={`${category.name} Logo`}
                    className="w-12 h-12 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#102542]">
                      {category.name}
                    </h3>
                    <p className="text-[#102542]/70">{category.description}</p>
                  </div>
                </div>

                {/* Featured Products */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {category.products.map((product, productIndex) => (
                    <div 
                      key={productIndex}
                      className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = '<div class="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 text-xs">Image</div>';
                          }}
                        />
                      </div>
                      <h4 className="font-medium text-xs text-[#102542] mb-1 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold" style={{ color: category.theme }}>
                        {product.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={category.link}
                    className="inline-block text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    style={{ backgroundColor: category.theme }}
                  >
                    Explore {category.name}
                  </Link>
                  <Link
                    to="/products"
                    className="inline-block bg-transparent border-2 text-base px-6 py-3 rounded-full transition-all duration-300"
                    style={{ 
                      borderColor: category.theme, 
                      color: category.theme 
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = category.theme;
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = category.theme;
                    }}
                  >
                    View All Products →
                  </Link>
                </div>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={category.bgImage}
                    alt={category.name}
                    className="w-full h-80 object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  ></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-bold text-lg">
                          {category.name}
                        </h4>
                        <p className="text-white/90 text-sm">
                          Quality Guaranteed
                        </p>
                      </div>
                      <div 
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                      >
                        <span className="text-white text-sm font-medium">
                          {category.products.length}+ Products
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryIntros;
