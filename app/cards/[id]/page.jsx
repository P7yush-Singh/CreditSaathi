"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function CardDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [card, setCard] = useState(null);
  const [related, setRelated] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch card + user session
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [cardRes, sessionRes] = await Promise.all([
          fetch(`/api/cards/get?id=${id}`),
          fetch("/api/user/check-session"),
        ]);

        const cardData = await cardRes.json();
        setCard(cardData);

        const sessionData = await sessionRes.json();
        if (sessionData.loggedIn) {
          setUser(sessionData.user);
          setIsSaved(sessionData.user.savedCards?.includes(cardData._id));
        }

        // Fetch related cards
        if (cardData.bank || cardData.category) {
          const relRes = await fetch(
            `/api/cards/related?bank=${encodeURIComponent(
              cardData.bank || ""
            )}&category=${encodeURIComponent(cardData.category || "")}`
          );
          if (relRes.ok) {
            const relData = await relRes.json();
            setRelated(relData.filter((c) => c._id !== id));
          }
        }
      } catch (error) {
        console.error("Error loading card:", error);
      }
    };

    fetchData();
  }, [id]);

  const toggleSave = async () => {
    if (!user) {
      toast.error("Please login to save cards");
      return;
    }

    try {
      const res = await fetch("/api/user/toggle-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: id }),
      });
      const data = await res.json();

      if (res.ok) {
        setIsSaved(data.saved);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Action failed");
      }
    } catch (err) {
      toast.error("Error updating card");
    }
  };

  if (!card)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading card details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b132b] to-[#1c2541] text-white py-10 px-4 sm:px-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mt-14 mx-auto">
        {/* Card Header */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <img
            src={card.image}
            alt={card.name}
            className="w-72 h-44 object-contain rounded-2xl bg-white/10 p-4 border border-white/20"
          />

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#09E85E]">
              {card.name}
            </h1>
            <p className="text-gray-300 mb-2 text-sm uppercase tracking-wide">
              {card.bank} — {card.category}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={toggleSave}
                className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                  isSaved
                    ? "bg-[#09E85E] text-black border-[#09E85E]"
                    : "bg-white/10 border-white/30 text-white hover:bg-[#09E85E]/20 hover:text-[#09E85E]"
                }`}
              >
                {isSaved ? "Saved ✓" : "Save Card"}
              </button>

              <a
                href={card.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-[#09E85E] text-black font-semibold hover:bg-[#09E85E]/90 transition"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-10 space-y-8">
          {/* Overview */}
          {card.overview?.length > 0 && (
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#09E85E] mb-3">
                Overview
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {card.overview.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Features */}
          {card.features?.length > 0 && (
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#09E85E] mb-3">
                Features
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {card.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Eligibility */}
{card.eligibility && (
  <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
    <h2 className="text-2xl font-semibold text-[#09E85E] mb-3">
      Eligibility
    </h2>
    {Array.isArray(card.eligibility) ? (
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {card.eligibility.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-300 leading-relaxed">{card.eligibility}</p>
    )}
  </section>
)}

{/* Who Should Buy */}
{card.whoShouldBuy && (
  <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
    <h2 className="text-2xl font-semibold text-[#09E85E] mb-3">
      Who Should Buy
    </h2>
    {Array.isArray(card.whoShouldBuy) ? (
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {card.whoShouldBuy.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-300 leading-relaxed">{card.whoShouldBuy}</p>
    )}
  </section>
)}

{/* Fees & Charges */}
{card.feesCharges && (
  <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
    <h2 className="text-2xl font-semibold text-[#09E85E] mb-3">
      Fees & Charges
    </h2>
    {Array.isArray(card.feesCharges) ? (
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {card.feesCharges.map((fee, i) => (
          <li key={i}>{fee}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-300 whitespace-pre-line leading-relaxed">
        {card.feesCharges}
      </p>
    )}
  </section>
)}

        </div>

        {/* Related Cards */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-5">
              Recommended Cards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relCard) => (
                <div
                  key={relCard._id}
                  onClick={() => router.push(`/cards/${relCard._id}`)}
                  className="cursor-pointer bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all"
                >
                  <img
                    src={relCard.image}
                    alt={relCard.name}
                    className="w-full h-36 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold text-[#09E85E]">
                    {relCard.name}
                  </h3>
                  <p className="text-sm text-gray-300">{relCard.bank}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
