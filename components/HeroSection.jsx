"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Sample credit cards data for search (matches data in category pages)
  const allCards = [
    {
      id: 1,
      name: "HDFC Millennia Credit Card",
      bank: "HDFC",
      category: "cashback",
      keywords: ["millennia", "hdfc", "cashback", "amazon", "flipkart", "swiggy"]
    },
    {
      id: 2,
      name: "SBI Card Elite",
      bank: "SBI",
      category: "travel",
      keywords: ["sbi", "elite", "travel", "lounge", "dining", "airport"]
    },
    {
      id: 3,
      name: "Axis Bank Neo Credit Card",
      bank: "Axis",
      category: "rewards",
      keywords: ["axis", "neo", "rewards", "myntra", "amazon", "bookmyshow"]
    },
    {
      id: 4,
      name: "ICICI Bank Coral Credit Card",
      bank: "ICICI",
      category: "travel",
      keywords: ["icici", "coral", "travel", "lounge", "premium"]
    },
    {
      id: 5,
      name: "HDFC Regalia Credit Card",
      bank: "HDFC",
      category: "travel",
      keywords: ["hdfc", "regalia", "travel", "premium", "lounge"]
    },
    {
      id: 6,
      name: "SBI SimplyCLICK Credit Card",
      bank: "SBI",
      category: "shopping",
      keywords: ["sbi", "simplyclick", "shopping", "online", "ecommerce"]
    },
    {
      id: 7,
      name: "HDFC Freedom Credit Card",
      bank: "HDFC",
      category: "fuel",
      keywords: ["hdfc", "freedom", "fuel", "petrol", "diesel", "gas"]
    },
    {
      id: 8,
      name: "SBI Card PRIME",
      bank: "SBI",
      category: "rewards",
      keywords: ["sbi", "prime", "rewards", "points", "bonus"]
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    
    // Search through cards
    const matchingCards = allCards.filter(card => 
      card.name.toLowerCase().includes(query) ||
      card.bank.toLowerCase().includes(query) ||
      card.keywords.some(keyword => keyword.includes(query))
    );

    if (matchingCards.length > 0) {
      // If we find exact matches, navigate to the first matching card
      const firstMatch = matchingCards[0];
      router.push(`/cards/${firstMatch.id}`);
    } else {
      // If no exact matches, try to find category matches
      const categoryKeywords = {
        'travel': ['travel', 'lounge', 'airport', 'flight'],
        'cashback': ['cashback', 'cash back', 'money'],
        'rewards': ['rewards', 'points', 'bonus'],
        'shopping': ['shopping', 'online', 'ecommerce'],
        'fuel': ['fuel', 'petrol', 'diesel', 'gas']
      };

      // Check for bank names
      const bankKeywords = {
        'hdfc': ['hdfc'],
        'sbi': ['sbi', 'state bank'],
        'axis': ['axis'],
        'icici': ['icici']
      };

      for (const [bank, keywords] of Object.entries(bankKeywords)) {
        if (keywords.some(keyword => query.includes(keyword))) {
          router.push(`/banks/${bank}`);
          return;
        }
      }

      // Check for category keywords
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => query.includes(keyword))) {
          router.push(`/categories/${category}`);
          return;
        }
      }

      // If no matches found, show a message or redirect to all cards
      router.push('/categories/travel'); // Default fallback
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#0A2540] to-[#193B63] text-white py-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find the <span className="text-[#2D9CDB]">Perfect Credit Card</span> for You
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Compare, explore, and apply for the best credit cards that match your lifestyle.
        </p>

        {/* Search Bar */}
        <div className="flex bg-white rounded-full overflow-hidden shadow-md max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search by card name or bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] focus:ring-opacity-50"
          />
          <button 
            onClick={handleSearch}
            className="bg-[#2D9CDB] px-6 flex items-center justify-center hover:bg-[#1E7BB8] transition-colors duration-200"
          >
            <Search className="text-white" />
          </button>
        </div>

        {/* Search Suggestions */}
        {searchQuery && (
          <div className="mt-4 max-w-lg mx-auto">
            <p className="text-sm text-gray-300 mb-2">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['HDFC', 'SBI', 'Travel', 'Cashback', 'Shopping', 'Rewards'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
