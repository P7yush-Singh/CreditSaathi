"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    name: "HDFC Millennia Credit Card",
    image: "/cards/hdfc.png",
    category: "Cashback",
    description: "5% cashback on Amazon, Flipkart, and more.",
  },
  {
    name: "Axis Bank Vistara Card",
    image: "/cards/axis.jpg",
    category: "Travel",
    description: "Free flight vouchers and lounge access.",
  },
  {
    name: "SBI SimplyCLICK Card",
    image: "/cards/sbi.jpg",
    category: "Rewards",
    description: "Earn reward points on online spends.",
  },
];

export default function FeaturedCards() {
  return (
    <section className="py-14 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Credit Cards</h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-[#F2F4F7] rounded-2xl shadow-md overflow-hidden"
          >
            <img src={card.image} alt={card.name} className="w-full h-40 object-contain bg-white" />
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold">{card.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{card.description}</p>
              <Link
                href={`/card/${card.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-block mt-4 px-5 py-2 bg-[#2D9CDB] text-white rounded-full hover:bg-[#238ac6] transition"
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
