"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          href="/admin/add-card"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Card
        </Link>
      </header>

      <div className="grid gap-4">
        {cards.map((card) => (
          <div
            key={card._id}
            className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{card.name}</h2>
              <p className="text-gray-500">{card.bank}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/edit-card/${card._id}`}
                className="text-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={async () => {
                  await fetch(`/api/cards/${card._id}`, { method: "DELETE" });
                  setCards(cards.filter((c) => c._id !== card._id));
                }}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
