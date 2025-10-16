"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Travel", color: "bg-blue-100", icon: "✈️" },
  { name: "Cashback", color: "bg-green-100", icon: "💰" },
  { name: "Rewards", color: "bg-yellow-100", icon: "🏆" },
  { name: "Fuel", color: "bg-orange-100", icon: "⛽" },
  { name: "FD Based", color: "bg-purple-100", icon: "🏦" },
  { name: "Shopping", color: "bg-pink-100", icon: "🛍️" },
];

export default function CategoryCards() {
  return (
    <section className="py-14 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Explore by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl ${cat.color} text-center py-6 shadow-sm hover:shadow-md transition`}
          >
            <Link href={`/categories/${cat.name.toLowerCase()}`}>
              <div className="text-4xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-gray-800">{cat.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
