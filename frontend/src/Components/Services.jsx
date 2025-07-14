// src/Components/Services.jsx
import { Link } from "react-router-dom";
export default function Services() {
  const items = [
    { title: "Order Products", desc: "Fast delivery to your door", link: "/products" },
    { title: "Join Our Team", desc: "Partner with us as a supplier", link: "/register" },
    { title: "Explore Categories", desc: "Browse curated ranges", link: "/categories" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((s,i)=>(
          <Link key={i} to={s.link} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
