// components/RecentlyViewed.jsx (client)
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecentlyViewed() {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecent = async () => {
      const res = await fetch("/api/user/check-session");
      const data = await res.json();
      if (!data.loggedIn) return;
      const ids = data.user.recentViews || [];
      if (ids.length === 0) return;

      // Fetch card details in bulk (you can create /api/cards/bulk route; we'll fetch individually for simplicity)
      const cardPromises = ids.map((id) => fetch(`/api/cards/get?id=${id}`).then(r => r.json()));
      const results = await Promise.all(cardPromises);
      setCards(results);
    };
    fetchRecent();
  }, []);

  if (cards.length === 0) return null;

  return (
    <div className="py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <h3 className="text-xl text-center text-white font-bold mb-3">Recently viewed</h3>
      <div className="flex gap-4 overflow-x-auto px-8">
        {cards.map((card) => (
          <div key={card._id} className="min-w-[220px] bg-white/6 backdrop-blur rounded-xl p-3 cursor-pointer" onClick={() => router.push(`/cards/${card._id}`)}>
            <img src={card.image} alt={card.name} className="w-full h-28 object-contain mb-2" />
            <p className="text-sm text-white">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
