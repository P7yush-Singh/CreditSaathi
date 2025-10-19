"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [recentCards, setRecentCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user + cards
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/user/check-session");
        const data = await res.json();
        if (!data.loggedIn) {
          router.push("/user/login");
          return;
        }

        setUser(data.user);

        // Fetch saved cards
        if (data.user.savedCards?.length > 0) {
          const bulkSaved = await fetch("/api/cards/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: data.user.savedCards }),
          });
          const savedData = await bulkSaved.json();
          setSavedCards(savedData);
        }

        // Fetch recently viewed cards
        if (data.user.recentViews?.length > 0) {
          const bulkRecent = await fetch("/api/cards/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: data.user.recentViews }),
          });
          const recentData = await bulkRecent.json();
          setRecentCards(recentData);
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const removeCard = async (id) => {
    await fetch("/api/user/unsave-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: id }),
    });
    setSavedCards(savedCards.filter((c) => c._id !== id));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1724] to-[#071029] text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto mt-16">
        <h1 className="text-3xl font-bold mb-8">
          Welcome, <span className="text-[#09E85E]">{user?.name}</span>
        </h1>

        {/* Saved Cards Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Saved Cards</h2>

          {savedCards.length === 0 ? (
            <p className="text-gray-400">You haven't saved any cards yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCards.map((card) => (
                <div
                  key={card._id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-md"
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-36 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold text-[#09E85E]">
                    {card.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">{card.bank}</p>

                  <div className="flex justify-between items-center">
                    <a
                      href={`/cards/${card._id}`}
                      className="text-sm text-[#09E85E] hover:underline"
                    >
                      View Details
                    </a>
                    <button
                      onClick={() => removeCard(card._id)}
                      className="text-sm text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recently Viewed Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
          {recentCards.length === 0 ? (
            <p className="text-gray-400">You haven’t viewed any cards yet.</p>
          ) : (
            <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#09E85E]/40 pb-3">
              {recentCards.map((card) => (
                <div
                  key={card._id}
                  className="min-w-[220px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-md cursor-pointer hover:scale-105 transition"
                  onClick={() => router.push(`/cards/${card._id}`)}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h4 className="text-sm font-medium text-[#09E85E] truncate">
                    {card.name}
                  </h4>
                  <p className="text-xs text-gray-400">{card.bank}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
