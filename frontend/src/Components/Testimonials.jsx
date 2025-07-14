// src/Components/Testimonials.jsx
export default function Testimonials() {
  const quotes = [
    { text: "Quality meats delivered fast!", author: "Alice – Mombasa" },
    { text: "Love the personalized packaging.", author: "John – Ukunda" },
    { text: "Exceptional customer service!", author: "Mary – Nyali" },
  ];
  return (
    <div className="bg-yellow-50 dark:bg-gray-800 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">What Clients Say</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {quotes.map((q,i)=>(
          <div key={i} className="text-center">
            <p className="italic text-lg">“{q.text}”</p>
            <p className="mt-2 font-semibold">— {q.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
