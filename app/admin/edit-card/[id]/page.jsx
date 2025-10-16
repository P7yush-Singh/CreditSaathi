"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCard() {
  const router = useRouter();
  const params = useParams();
  const [card, setCard] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(`/api/cards/get?id=${params.id}`);
      const data = await res.json();
      // Convert arrays to comma separated strings for editing
      const converted = { ...data };
      ["features","eligibility","whoShouldBuy","overview","feesCharges"].forEach(
        (key) => (converted[key] = data[key]?.join(", ") || "")
      );
      setCard(converted);
    };
    fetchCard();
  }, [params.id]);

  const handleChange = (e) => setCard({ ...card, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let imageUrl = card.image;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error);
        imageUrl = uploadData.url;
      }

      // Convert text back to arrays
      const payload = {
        ...card,
        image: imageUrl,
      };
      ["features","eligibility","whoShouldBuy","overview","feesCharges"].forEach(
        (key) => (payload[key] = card[key]?.split(",").map((x) => x.trim()))
      );

      const res = await fetch(`/api/cards/update/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setMessage("✅ Card updated successfully!");
      setTimeout(() => router.push("/admin/manage-cards"), 1500);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!card) return <div className="text-center mt-10">Loading card...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Edit Credit Card
        </h2>
        {message && <p className="text-center text-blue-600 font-semibold">{message}</p>}

        {card.image && (
          <div className="flex flex-col items-center">
            <img
              src={card.image}
              alt={card.name}
              className="w-48 h-32 object-contain mb-3 rounded-md border"
            />
            <p className="text-sm text-gray-500 mb-2">Current Image</p>
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {[
          "name",
          "category",
          "bank",
          "features",
          "eligibility",
          "whoShouldBuy",
          "overview",
          "feesCharges",
          "applyLink",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {["features","eligibility","whoShouldBuy","overview","feesCharges"].includes(field) ? (
              <textarea
                name={field}
                value={card[field]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                rows={3}
              />
            ) : (
              <input
                name={field}
                value={card[field]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Updating..." : "Update Card"}
        </button>
      </form>
    </div>
  );
}
