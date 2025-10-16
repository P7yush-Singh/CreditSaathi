"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCard() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "",
    bank: "",
    features: "",
    eligibility: "",
    whoShouldBuy: "",
    overview: "",
    feesCharges: "",
    applyLink: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let imageUrl = form.image;

    try {
      // Upload image if provided
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error);
        imageUrl = uploadData.url;
      }

      // Convert text inputs to arrays
      const payload = {
        name: form.name,
        image: imageUrl,
        category: form.category,
        bank: form.bank,
        features: form.features.split(",").map((x) => x.trim()),
        eligibility: form.eligibility.split(",").map((x) => x.trim()),
        whoShouldBuy: form.whoShouldBuy.split(",").map((x) => x.trim()),
        overview: form.overview.split(",").map((x) => x.trim()),
        feesCharges: form.feesCharges.split(",").map((x) => x.trim()),
        applyLink: form.applyLink,
      };

      const res = await fetch("/api/cards/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add card");

      setMessage("✅ Card added successfully!");
      setTimeout(() => router.push("/admin/manage-cards"), 1500);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-600">
          Add New Credit Card
        </h2>
        {message && <p className="text-center text-blue-600 font-semibold">{message}</p>}

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded-md p-2" />
        </div>

        {/* Inputs */}
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
                placeholder="Separate each item with commas"
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                rows={3}
              />
            ) : (
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Adding Card..." : "Add Card"}
        </button>
      </form>
    </div>
  );
}
