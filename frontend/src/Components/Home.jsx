// src/Components/Home.jsx
import Hero from "./Hero";
import About from "./About";
import Products from "./Products";
import CommonProducts from "./CommonProducts";
import Categories from "./Categories";
import Services from "./Services";           // New

export default function Home() {
  return (
    <div className="space-y-24">
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <Services />                {/* Artcaffé‑style service overview */}
      <section id="products"><Products /></section>
      <section id="common-products"><CommonProducts /></section>
      <section id="categories"><Categories /></section>
    </div>
  );
}
