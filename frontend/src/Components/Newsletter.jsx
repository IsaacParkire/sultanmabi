// src/Components/Newsletter.jsx
import { useState } from "react";
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };
  return (
    <div className="bg-gray-900 text-white py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Get the Latest News & Offers</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-grow px-4 py-2 rounded-l-lg text-gray-900"
        />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-6 rounded-r-lg">
          Subscribe
        </button>
      </form>
    </div>
  );
}
