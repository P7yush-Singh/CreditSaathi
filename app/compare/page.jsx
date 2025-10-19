"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ComparePage() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards/get");
        const data = await res.json();
        setCards(data);
        setFilteredCards(data);
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Search logic
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(
        (card) =>
          card.name.toLowerCase().includes(search.toLowerCase()) ||
          card.bank.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [search, cards]);

  const handleSelect = (card) => {
    if (selectedCards.some((c) => c._id === card._id)) {
      setSelectedCards(selectedCards.filter((c) => c._id !== card._id));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card]);
    } else {
      alert("You can compare up to 3 cards at once.");
    }
  };

  const clearSelection = () => setSelectedCards([]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading cards...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Compare Credit Cards
        </h1>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search cards by name or bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Selected cards preview */}
        {selectedCards.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
              Selected Cards
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {selectedCards.map((card) => (
                <div
                  key={card._id}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg w-44 shadow-sm"
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="text-sm font-medium text-center">{card.name}</p>
                  <button
                    onClick={() =>
                      setSelectedCards(
                        selectedCards.filter((c) => c._id !== card._id)
                      )
                    }
                    className="mt-2 text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {selectedCards.length >= 2 && (
              <div className="flex justify-center mt-6">
                <a
                  href="#comparison-table"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  View Comparison
                </a>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                onClick={clearSelection}
                className="text-gray-600 text-sm hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Card selection grid */}
        {filteredCards.length === 0 ? (
          <p className="text-center text-gray-600">No cards found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCards.map((card) => (
              <div
                key={card._id}
                className={`bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer ${
                  selectedCards.some((c) => c._id === card._id)
                    ? "ring-2 ring-blue-600"
                    : ""
                }`}
                onClick={() => handleSelect(card)}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="font-semibold text-blue-700 text-lg mb-1">
                  {card.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{card.bank}</p>
                <p className="text-xs text-gray-500">
                  {card.overview?.[0] || card.features?.[0] || ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Comparison table */}
        {selectedCards.length >= 2 && (
          <div
            id="comparison-table"
            className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
              Comparison Table
            </h2>
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border p-3 text-left">Details</th>
                  {selectedCards.map((card) => (
                    <th key={card._id} className="border p-3 text-center">
                      {card.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-semibold">Bank</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="border p-3 text-center">
                      {card.bank}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">Overview</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="border p-3 text-sm">
                      {card.overview?.join(", ") || "N/A"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">Features</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="border p-3 text-sm">
                      <ul className="list-disc list-inside">
                        {card.features?.slice(0, 5).map((f, i) => (
                          <li key={i}>{f}</li>
                        )) || <li>N/A</li>}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">Eligibility</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="border p-3 text-sm">
                      {card.eligibility?.join(", ") || "N/A"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">Fees & Charges</td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="border p-3 text-sm">
                      {card.feesCharges?.join(", ") || "N/A"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border p-3 font-semibold text-blue-700">
                    Apply Now
                  </td>
                  {selectedCards.map((card) => (
                    <td key={card._id} className="border p-3 text-center">
                      <a
                        href={card.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                      >
                        Apply
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
