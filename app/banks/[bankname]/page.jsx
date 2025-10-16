"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BankCardsPage() {
  const { bankName } = useParams();
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/cards/bank?bank=${bankName}`);
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching bank cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [bankName]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading {bankName} cards...
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold">
          No Credit Cards Found for {bankName}
        </h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
        >
          Back to Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 text-center">
          {bankName.toUpperCase()} Credit Cards
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
              onClick={() => router.push(`/cards/${card._id}`)}
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 object-contain mb-3"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-blue-700 mb-1">
                  {card.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {card.category} Card
                </p>

                {/* Show short overview list */}
                {card.overview?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 text-sm mb-3">
                    {card.overview.slice(0, 3).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/cards/${card._id}`);
                }}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
