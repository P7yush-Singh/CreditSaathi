"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 15;

  const categories = [
    "All",
    "Travel",
    "Cashback",
    "Fuel",
    "Rewards",
    "Shopping",
    "FD Based",
    "LifeTime Free"
  ];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards/get");
        const data = await res.json();
        setCards(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Search & Filter Logic
  useEffect(() => {
    let updated = cards;

    if (category !== "All") {
      updated = updated.filter(
        (card) =>
          card.category &&
          card.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      updated = updated.filter(
        (card) =>
          card.name.toLowerCase().includes(search.toLowerCase()) ||
          card.bank.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(updated);
    setCurrentPage(1);
  }, [search, category, cards]);

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentCards = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / cardsPerPage);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading all cards...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          All Credit Cards
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Search by card name or bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-1/4 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Cards Grid */}
        {currentCards.length === 0 ? (
          <p className="text-center text-gray-600">No cards found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCards.map((card) => (
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
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
              } transition`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
              } transition`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
