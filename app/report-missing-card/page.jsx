"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ReportMissingCard = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    bankName: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just show success message (later connect to backend)
    setSuccess(true);
    setFormData({
      cardName: "",
      bankName: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Report a Missing Credit Card
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Tell us which credit card is missing from Credit Saathi, and we’ll
          make sure to add it soon.
        </p>

        {success ? (
          // here I want to add auto redirect to home page after 5 seconds
          <div className="text-center text-green-600 font-medium">
            ✅ Thank you! We’ve received your request and will review it shortly.
            {/* Auto redirect to home after 5 seconds */}
            {(() => {
              if (typeof window !== "undefined") {
                setTimeout(() => {
                  router.push("/");
                }, 5000);
              }
            })()}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Credit Card Name
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                required
                placeholder="e.g., HDFC Regalia Credit Card"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
                placeholder="e.g., HDFC Bank"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any details or reason to add this card..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 rounded-lg hover:scale-[1.02] transition-transform"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportMissingCard;
