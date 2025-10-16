"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageCards() {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const res = await fetch("/api/cards/get");
    const data = await res.json();
    setCards(data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this card?")) {
      await fetch(`/api/cards/delete/${id}`, { method: "DELETE" });
      fetchCards();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col"
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-40 object-contain mb-3"
            />
            <h2 className="text-lg font-semibold">{card.name}</h2>
            <p className="text-sm text-gray-600">{card.bank}</p>
            <p className="text-sm text-gray-600 mb-2">{card.category}</p>

            <div className="flex justify-between mt-auto">
              <Link
                href={`/admin/edit-card/${card._id}`}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(card._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
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
