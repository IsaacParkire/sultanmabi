// src/Components/Footer.jsx

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-scroll";
import visa from "../assets/payments/visa.png";
import mpesa from "../assets/payments/mpesa.png";
import paypal from "../assets/payments/paypal.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: info@sultanmabi.com</p>
          <p>Phone: +254 700 000 000</p>
          <p>Location: Mombasa, Kenya</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="home" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-500">Home</Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-500">About</Link>
            </li>
            <li>
              <Link to="featured" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-500">Featured Products</Link>
            </li>
            <li>
              <Link to="categories" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-500">Categories</Link>
            </li>
            <li>
              <Link to="testimonials" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-500">Testimonials</Link>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-500">My Orders</a></li>
            <li><a href="#" className="hover:text-yellow-500">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-yellow-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-500">Help & FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-500">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social & Payments */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect & Pay</h3>
          <div className="flex space-x-5 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-500"><Facebook size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-500"><Instagram size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-500"><Twitter size={24} /></a>
            <a href="mailto:info@sultanmabi.com" className="hover:text-yellow-500"><Mail size={24} /></a>
          </div>
          <h4 className="text-sm mb-2 text-gray-400">We Accept</h4>
          <div className="flex items-center space-x-4">
            <img src={visa} alt="Visa" className="h-8" />
            <img src={mpesa} alt="M-Pesa" className="h-8" />
            <img src={paypal} alt="PayPal" className="h-9" />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12 pb-6 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} SultanMabi. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
