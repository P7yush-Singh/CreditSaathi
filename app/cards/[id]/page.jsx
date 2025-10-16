"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CardDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [card, setCard] = useState(null);
  const [relatedCards, setRelatedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/cards/get?id=${id}`);
        const data = await res.json();
        setCard(data);

        // fetch related cards (same bank or category)
        if (data?.category || data?.bank) {
          const relRes = await fetch(
            `/api/cards/related?category=${data.category}&bank=${data.bank}`
          );
          const relData = await relRes.json();
          setRelatedCards(relData.filter((c) => c._id !== id));
        }
      } catch (error) {
        console.error("Error loading card:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!card) return <div className="text-center mt-10">Loading card details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Card Header */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={card.image}
            alt={card.name}
            className="w-64 h-40 object-contain border rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-700">{card.name}</h1>
            <p className="text-gray-600 mt-2">
              <strong>Bank:</strong> {card.bank}
            </p>
            <p className="text-gray-600">
              <strong>Category:</strong> {card.category}
            </p>

            <button
              onClick={() => window.open(card.applyLink, "_blank")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Overview */}
        {card.overview?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-700">Overview</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {card.overview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Features */}
        {card.features?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-700">Features</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {card.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Eligibility */}
        {card.eligibility?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-700">Eligibility</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {card.eligibility.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Who Should Buy */}
        {card.whoShouldBuy?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-700">Who Should Get This Card?</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {card.whoShouldBuy.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Fees & Charges */}
        {card.feesCharges?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-700">Fees & Charges</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {card.feesCharges.map((fee, index) => (
                <li key={index}>{fee}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Related Cards */}
      {relatedCards.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCards.map((rcard) => (
              <div
                key={rcard._id}
                onClick={() => router.push(`/cards/${rcard._id}`)}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={rcard.image}
                  alt={rcard.name}
                  className="w-full h-32 object-contain mb-2"
                />
                <h3 className="font-semibold text-blue-700 text-lg">{rcard.name}</h3>
                <p className="text-sm text-gray-600">{rcard.bank}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
