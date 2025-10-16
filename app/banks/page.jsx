"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BanksPage() {
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  // Fetch all banks
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("/api/banks");
        const data = await res.json();
        setBanks(data);
        setFilteredBanks(data);
      } catch (error) {
        console.error("Failed to load banks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanks();
  }, []);

  // Filter logic (runs when search or letter changes)
  useEffect(() => {
    let filtered = banks;

    if (searchTerm) {
      filtered = filtered.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLetter) {
      filtered = filtered.filter((bank) =>
        bank.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    setFilteredBanks(filtered);
  }, [searchTerm, selectedLetter, banks]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading banks...
      </div>
    );

  if (banks.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold">No banks added yet</h2>
        <p className="mt-2">Please check again later!</p>
      </div>
    );

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 text-center">
          Our Partner Banks
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bank by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filter by Letter */}
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() =>
                  setSelectedLetter(selectedLetter === letter ? "" : letter)
                }
                className={`px-3 py-1 rounded-md border ${
                  selectedLetter === letter
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-200"
                } transition`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(searchTerm || selectedLetter) && (
          <div className="text-center mb-6">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLetter("");
              }}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Banks Grid */}
        {filteredBanks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBanks.map((bank) => (
              <div
                key={bank._id}
                onClick={() => router.push(`/banks/${bank.name}`)}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer border border-gray-100"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-20 h-20 object-contain mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {bank.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No banks found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
