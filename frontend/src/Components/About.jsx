import { motion } from "framer-motion";
import { FaLeaf, FaTruck, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomeAbout() {
  // Values data
  const values = [
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Ethical Sourcing",
      description: "Partnering with local farmers for humane treatment and sustainable practices"
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      title: "Quality Commitment",
      description: "Every cut inspected by master butchers for premium quality"
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Reliable Delivery",
      description: "Temperature-controlled freshness from facility to kitchen"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FCF7F8] font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* About Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/about.jpeg"
                alt="Sultanmabi Premises"
                className="w-full h-auto object-cover aspect-video lg:aspect-[3/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102542]/70 to-transparent"></div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-2">
              <span className="text-[#A31621] font-semibold tracking-wide">OUR STORY</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#102542]">
              Premium Meats, <span className="text-[#A31621]">Exceptional Quality</span>
            </h2>
            
            <p className="text-lg text-[#102542] mb-6 leading-relaxed">
              At <span className="font-semibold text-[#A31621]">Sultanmabi</span>, we're dedicated to delivering the finest quality meats from trusted suppliers to your table. We prioritize freshness, flavor, and reliability—making every meal a premium experience.
            </p>
            
            <p className="text-lg text-[#102542] mb-8 leading-relaxed">
              Whether you're preparing a family dinner or running a busy kitchen, we're here to serve quality cuts, sausages, fish, pork, and more—quickly and conveniently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-4 rounded-xl border border-[#102542]/10 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-[#A31621] mb-3">{value.icon}</div>
                  <h3 className="font-bold text-lg text-[#102542] mb-2">{value.title}</h3>
                  <p className="text-[#102542]/90 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-block bg-[#A31621] hover:bg-[#8a121c] text-white px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Our Products
              </Link>
              
              <Link
                to="/about"
                className="inline-block bg-transparent border-2 border-[#102542] text-[#102542] hover:bg-[#102542] hover:text-white px-8 py-3 rounded-full text-lg transition-all duration-300"
              >
                Our Full Story →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomeAbout;