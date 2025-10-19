"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards/get");
        const data = await res.json();

        // Show only the latest 6 cards or mark specific ones as "featured" later
        setCards(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <section className="py-14 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Credit Cards</h2>
        <p className="text-gray-500">Loading featured cards...</p>
      </section>
    );
  }

  if (cards.length === 0) {
    return (
      <section className="py-14 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Credit Cards</h2>
        <p className="text-gray-500">No featured cards available.</p>
      </section>
    );
  }

  return (
    <section className="py-14 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">
        Featured Credit Cards
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={card._id || i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="bg-white flex justify-center items-center h-40">
              <img
                src={card.image || "/placeholder-card.png"}
                alt={card.name}
                className="max-h-36 object-contain"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-blue-700">
                {card.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {card.overview && card.overview.length > 0
                  ? card.overview[0]
                  : card.features && card.features.length > 0
                  ? card.features[0]
                  : "Explore card benefits and rewards."}
              </p>
              <Link
                href={`/cards/${card._id}`}
                className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
