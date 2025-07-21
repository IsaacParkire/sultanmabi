import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaPhone, FaLeaf, FaTruck, FaStar } from "react-icons/fa";

function About() {
  // Team members data
  const teamMembers = [
    {
      name: "Michael Johnson",
      role: "Head Butcher",
      bio: "20+ years of experience in premium meat selection and preparation.",
      image: "/images/team1.jpg"
    },
    {
      name: "Sarah Williams",
      role: "Quality Control",
      bio: "Ensures every product meets our rigorous standards for freshness and quality.",
      image: "/images/team2.jpg"
    },
    {
      name: "David Kimani",
      role: "Customer Relations",
      bio: "Dedicated to ensuring our customers receive exceptional service.",
      image: "/images/team3.jpg"
    },
    {
      name: "Grace Omondi",
      role: "Logistics Manager",
      bio: "Manages our cold chain to guarantee freshness from farm to doorstep.",
      image: "/images/team4.jpg"
    }
  ];

  // Shop locations data
  const locations = [
    {
      name: "Westlands Flagship",
      address: "Westgate Shopping Mall, 3rd Floor",
      hours: "Mon-Sat: 8am-8pm, Sun: 9am-6pm",
      phone: "+254 712 345 678",
      features: ["Butchery Counter", "Cooking Classes", "Tasting Room"]
    },
    {
      name: "Karen Boutique",
      address: "Karen Hub, Next to ArtCaffe",
      hours: "Mon-Sat: 9am-7pm, Sun: 10am-5pm",
      phone: "+254 734 567 890",
      features: ["Specialty Cuts", "Gourmet Products", "Wine Pairing"]
    },
    {
      name: "CBD Express",
      address: "Koinange Street, Nation Centre",
      hours: "Mon-Fri: 7am-7pm, Sat: 8am-5pm",
      phone: "+254 720 987 654",
      features: ["Quick Pickup", "Lunch Specials", "Corporate Orders"]
    }
  ];

  // Values data
  const values = [
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Ethical Sourcing",
      description: "We partner with local farmers who practice humane animal treatment and sustainable farming."
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      title: "Quality Commitment",
      description: "Every cut is inspected by our master butchers to ensure premium quality and freshness."
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Reliable Delivery",
      description: "Our temperature-controlled fleet ensures freshness from our facility to your kitchen."
    }
  ];

  return (
    <div className="bg-[#FCF7F8] font-sans">
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-br from-[#102542]/90 to-[#A31621]/90">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-[#FCF7F8]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Our <span className="text-[#FCF7F8]">Story</span> & <span className="text-[#FCF7F8]">Passion</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-[#FCF7F8]/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Discover the journey, values, and people behind Sultanmabi's commitment to premium meats
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#FCF7F8]"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[#FCF7F8]"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-[#FCF7F8]"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* About Image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="/images/about.jpeg"
                alt="About Us"
                className="rounded-3xl shadow-artcaffe-lg border-4 border-[#A31621]"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#102542] text-[#FCF7F8] py-4 px-8 rounded-xl shadow-lg">
                <p className="text-xl font-bold">Since 2010</p>
                <p className="text-sm">Serving premium meats</p>
              </div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#A31621]">
              About <span className="text-[#102542]">Sultanmabi</span>
            </h2>
            <p className="text-lg text-[#102542] mb-6 leading-relaxed">
              At <span className="font-semibold text-[#A31621]">Sultanmabi</span>, we're committed to delivering the finest quality meats from trusted Farmer's Choice suppliers to your table. We prioritize freshness, flavor, and reliability—making every meal a premium experience.
            </p>
            <p className="text-lg text-[#102542] mb-8 leading-relaxed">
              Whether you're preparing a family dinner or running a busy kitchen, we're here to serve quality cuts, sausages, fish, pork, and more—quickly and conveniently.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-[#FCF7F8] p-4 rounded-xl border border-[#102542]/10 shadow-sm"
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
            
            <a
              href="#featured"
              className="inline-block bg-[#A31621] hover:bg-[#8a121c] text-[#FCF7F8] px-8 py-3 rounded-full text-lg transition-transform transform hover:scale-105 shadow-md"
            >
              Explore Our Products
            </a>
          </motion.div>
        </div>
      </section>

      {/* Our Shops Section */}
      <section id="our-shops" className="py-20 bg-[#102542]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-[#A31621]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Shops
            </motion.h2>
            <motion.p 
              className="text-xl text-[#102542] max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Visit us at one of our premium locations for an exceptional meat-buying experience
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                className="bg-[#FCF7F8] rounded-2xl overflow-hidden shadow-artcaffe-lg border border-[#102542]/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 bg-gray-200 border-b-4 border-[#A31621] relative">
                  <div className="bg-[#A31621] text-[#FCF7F8] py-2 px-4 absolute top-4 left-4 rounded-lg font-bold">
                    {location.name}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <FaMapMarkerAlt className="text-[#A31621] mt-1 mr-3" />
                    <p className="text-[#102542]">{location.address}</p>
                  </div>
                  <div className="flex items-start mb-4">
                    <FaClock className="text-[#A31621] mt-1 mr-3" />
                    <p className="text-[#102542]">{location.hours}</p>
                  </div>
                  <div className="flex items-start mb-6">
                    <FaPhone className="text-[#A31621] mt-1 mr-3" />
                    <p className="text-[#102542]">{location.phone}</p>
                  </div>
                  
                  <div className="border-t border-[#102542]/10 pt-4">
                    <h4 className="font-bold text-[#102542] mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {location.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#A31621] mr-3"></div>
                          <span className="text-[#102542]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 bg-[#102542] rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#FCF7F8] mb-4">Can't visit in person?</h3>
            <p className="text-[#FCF7F8]/90 mb-6 max-w-2xl mx-auto">
              We offer nationwide delivery with our temperature-controlled vehicles to ensure your meat arrives fresh and perfectly chilled.
            </p>
            <a 
              href="/delivery" 
              className="inline-block bg-[#FCF7F8] text-[#102542] hover:bg-[#FCF7F8]/90 px-8 py-3 rounded-full font-bold shadow-lg transition-all"
            >
              Check Delivery Areas
            </a>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="our-team" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-[#A31621]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="text-xl text-[#102542] max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Passionate experts dedicated to bringing you the finest meats
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-[#FCF7F8] rounded-2xl overflow-hidden shadow-artcaffe-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="bg-gradient-to-t from-[#102542] to-transparent absolute inset-0"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-[#FCF7F8]">{member.name}</h3>
                    <p className="text-[#FCF7F8]/90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6 border-t-4 border-[#A31621]">
                  <p className="text-[#102542] mb-6">{member.bio}</p>
                  <div className="flex space-x-4">
                    <button className="text-[#102542] hover:text-[#A31621] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="text-[#102542] hover:text-[#A31621] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#102542] mb-6">Join Our Team</h3>
            <p className="text-[#102542] max-w-2xl mx-auto mb-8">
              We're always looking for passionate individuals who share our commitment to quality and customer service.
            </p>
            <a 
              href="/careers" 
              className="inline-block bg-[#102542] text-[#FCF7F8] hover:bg-[#0a1a2e] px-8 py-3 rounded-full font-bold shadow-lg transition-all"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#A31621]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-[#A31621]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Commitment
            </motion.h2>
            <motion.p 
              className="text-xl text-[#102542] max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              The principles that guide everything we do
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 rounded-full bg-[#102542] flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-[#FCF7F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#102542] mb-4">Quality Assurance</h3>
              <p className="text-[#102542] max-w-md mx-auto">
                Every product undergoes rigorous quality checks to ensure it meets our high standards for freshness, texture, and flavor.
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 rounded-full bg-[#102542] flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-[#FCF7F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#102542] mb-4">Customer Focus</h3>
              <p className="text-[#102542] max-w-md mx-auto">
                We listen to our customers and continuously improve our offerings to meet their evolving needs and preferences.
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 rounded-full bg-[#102542] flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-[#FCF7F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#102542] mb-4">Sustainable Practices</h3>
              <p className="text-[#102542] max-w-md mx-auto">
                We're committed to environmentally responsible practices throughout our supply chain and operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;