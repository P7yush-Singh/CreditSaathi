"use client";
import { useState } from "react";

export default function AddBank() {
  const [form, setForm] = useState({ name: "", logo: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle file input
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let logoUrl = form.logo;

      // 1️⃣ Upload image to Cloudinary
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error);

        logoUrl = uploadData.url; // Cloudinary URL
      }

      // 2️⃣ Save bank info in MongoDB
      const res = await fetch("/api/banks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, logo: logoUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add bank");

      setMessage("✅ Bank added successfully!");
      setForm({ name: "", logo: "" });
      setFile(null);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Add New Bank
        </h2>

        {message && (
          <p
            className={`text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Bank Name */}
        <div>
          <label className="block mb-1 font-medium">Bank Name</label>
          <input
            type="text"
            name="name"
            value={form.name.toUpperCase()}
            onChange={handleChange}
            placeholder="Enter bank name"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Upload Image */}
        <div>
          <label className="block mb-1 font-medium">Upload Bank Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md focus:outline-none"
          />
          {file && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Preview Image */}
        {file && (
          <div className="flex justify-center mt-2">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-24 h-24 object-contain border rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Adding Bank..." : "Add Bank"}
        </button>
      </form>
    </div>
  );
}
