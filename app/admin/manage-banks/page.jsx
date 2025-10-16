"use client";
import { useEffect, useState } from "react";

export default function ManageBanks() {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingBank, setEditingBank] = useState(null);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all banks
  const fetchBanks = async () => {
    try {
      const res = await fetch("/api/banks");
      const data = await res.json();
      setBanks(data);
      setFilteredBanks(data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // Search filter
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBanks(banks);
    } else {
      const filtered = banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  }, [searchTerm, banks]);

  // Delete bank
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this bank?")) return;
    try {
      const res = await fetch(`/api/banks/delete?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("✅ Bank deleted successfully!");
        fetchBanks();
      } else {
        setMessage("❌ Failed to delete bank");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Edit bank
  const handleEdit = (bank) => {
    setEditingBank(bank);
    setFile(null);
    setMessage("");
  };

  // Upload image
  const uploadImage = async () => {
    if (!file) return editingBank.logo;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.url;
  };

  // Save updated bank
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const logoUrl = await uploadImage();
      const res = await fetch(`/api/banks/update?id=${editingBank._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingBank.name, logo: logoUrl }),
      });

      if (res.ok) {
        setMessage("✅ Bank updated successfully!");
        setEditingBank(null);
        fetchBanks();
      } else {
        setMessage("❌ Failed to update bank");
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading banks...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
          Manage Banks
        </h1>
        <h1 className="text-right py-4 text-blue-500 font-semibold">Total Number of Banks : <span className="font-bold text-xl">{banks.length}</span></h1>
        {/* Message */}
        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search bank by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Banks Grid */}
        {filteredBanks.length === 0 ? (
          <p className="text-center text-gray-600">No banks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanks.map((bank) => (
              <div
                key={bank._id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition border"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">
                    {bank.name}
                  </h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(bank)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bank._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
              Edit Bank
            </h2>

            <label className="block mb-1 font-medium">Bank Name</label>
            <input
              type="text"
              value={editingBank.name}
              onChange={(e) =>
                setEditingBank({ ...editingBank, name: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-3"
              required
            />

            <label className="block mb-1 font-medium">Upload New Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded-md mb-2"
            />

            {editingBank.logo && (
              <div className="flex justify-center mt-2">
                <img
                  src={file ? URL.createObjectURL(file) : editingBank.logo}
                  alt="Preview"
                  className="w-24 h-24 object-contain border rounded-md"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setEditingBank(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
