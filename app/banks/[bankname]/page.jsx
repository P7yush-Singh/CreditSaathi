"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BankCardsPage() {
  const params = useParams();
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const bankName = params?.bankName;

  useEffect(() => {
    if (!bankName) return; // ✅ Prevent undefined error

    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/cards/bank?bank=${bankName}`);
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [bankName]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading cards for {bankName || "bank"}...
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold">
          No cards found for {bankName}.
        </h2>
        <button
          onClick={() => router.push("/banks")}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Banks
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 text-center">
          {bankName} Credit Cards
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card._id}
              onClick={() => router.push(`/cards/${card._id}`)}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="font-semibold text-blue-700 text-lg mb-1">
                {card.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{card.bank}</p>
              <button
                onClick={() => router.push(`/cards/${card._id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700"
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
