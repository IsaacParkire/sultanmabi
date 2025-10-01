// src/Components/Home.jsx
import Hero from "./Hero";
import About from "./About";
import QuickSell from "./QuickSellNew";
import CategoryIntros from "./CategoryIntros";
import CommonProducts from "./CommonProducts";
import Services from "./Services";           // New

export default function Home() {
  return (
    <div className="space-y-24">
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="quick-sell"><QuickSell /></section>
      <section id="categories"><CategoryIntros /></section>
      <Services />                {/* Artcaffé‑style service overview */}
      <section id="common-products"><CommonProducts /></section>
    </div>
  );
}
